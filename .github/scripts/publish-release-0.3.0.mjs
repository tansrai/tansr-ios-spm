import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';

const repository='tansrai/tansr-ios-spm';
const version='0.3.0';
const source='6343d52507506cd48088c12f9abd45150a3e307a';
const directory='.release/0.3.0';
const expected={
  'TansrCore.xcframework.zip':'93b65f1136529fc72b324be2ce74918c13611280f4a7b2f1777f2808b8038a27',
  'TansrClient.xcframework.zip':'06b0b6c0614290ddc74c611bbcc4bd1bc14c7120f90996ed30b6eaeaa9b82abd',
  'TansrUI.xcframework.zip':'d1311e1ad2a944d17953cfd3fbb0d7d97553f9637320b791f9636d408259f921',
};
const allowed=[...Object.keys(expected),'manifest.json','SHA256SUMS'].sort();
if(fs.readdirSync(directory).sort().join('|')!==allowed.join('|'))throw Error('Unexpected release file');
const manifest=JSON.parse(fs.readFileSync(path.join(directory,'manifest.json')));
if(manifest.version!==version||manifest.sourceCommit!==source)throw Error('Binary provenance differs');
const packageText=fs.readFileSync('Package.swift','utf8');
const sums=fs.readFileSync(path.join(directory,'SHA256SUMS'),'utf8');
const assets=allowed.map(name=>{
  const bytes=fs.readFileSync(path.join(directory,name));
  const digest=crypto.createHash('sha256').update(bytes).digest('hex');
  if(expected[name]){
    if(digest!==expected[name])throw Error('Binary digest differs: '+name);
    if(!sums.includes(`${digest}  ${name}\n`))throw Error('SHA256SUMS differs: '+name);
    if(!packageText.includes(`releases/download/${version}/${name}`)||!packageText.includes(digest))throw Error('SPM digest differs: '+name);
    if(!manifest.artifacts.some(a=>a.filename===name&&a.sha256===digest&&a.bytes===bytes.length))throw Error('Manifest digest differs: '+name);
  }
  return {name,bytes:bytes.length,digest:'sha256:'+digest};
});
if(process.argv.includes('--verify-only')){
  console.log(JSON.stringify({version,source,assets,verificationOnly:true}));
  process.exit(0);
}
if(process.env.RELEASE_REPOSITORY!==repository||!process.env.GH_TOKEN||!/^\w{40}$/.test(process.env.RELEASE_COMMIT??''))throw Error('Wrong publication context');
const api=(endpoint,args=[],input)=>JSON.parse(execFileSync('gh',['api',endpoint,...args],{encoding:'utf8',input,maxBuffer:4*1024*1024}));
const absent=endpoint=>{
  try {api(endpoint);}
  catch(error){if(String(error.stderr).includes('HTTP 404'))return;throw error;}
  throw Error('Refusing to replace an existing release or tag');
};
absent(`repos/${repository}/releases/tags/${version}`);
absent(`repos/${repository}/git/ref/tags/${version}`);
const draft=api(`repos/${repository}/releases`,['--method','POST','--input','-'],JSON.stringify({tag_name:version,target_commitish:process.env.RELEASE_COMMIT,name:'Tansr iOS SDK '+version,body:fs.readFileSync('RELEASE-0.3.0.md','utf8'),draft:true,prerelease:false}));
if(!draft.draft||draft.tag_name!==version)throw Error('Unexpected draft response');
execFileSync('gh',['release','upload',version,...assets.map(a=>path.join(directory,a.name)),'--repo',repository],{stdio:'inherit'});
const staged=api(`repos/${repository}/releases/${draft.id}`);
if(!staged.draft||staged.assets.length!==assets.length)throw Error('Draft assets incomplete');
for(const asset of assets){
  const remote=staged.assets.find(a=>a.name===asset.name);
  if(remote?.state!=='uploaded'||remote.size!==asset.bytes||remote.digest!==asset.digest)throw Error('Uploaded asset differs: '+asset.name);
}
// Only a fully verified draft can create the public SPM tag and Release.
const published=api(`repos/${repository}/releases/${draft.id}`,['--method','PATCH','--input','-'],JSON.stringify({draft:false,make_latest:'true'}));
if(published.draft||published.prerelease)throw Error('Release is not stable/public');
console.log(JSON.stringify({releaseId:published.id,url:published.html_url,version,source,commit:process.env.RELEASE_COMMIT,assets}));
