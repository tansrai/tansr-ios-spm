# Tansr iOS SDK 0.3.0

Public SwiftPM manifest and binary XCFramework distribution under `tansrai`.

Install `https://github.com/tansrai/tansr-ios-spm.git`, version `0.3.0`.

## Changes

- Adds `SearchResultDetails` and `NetworkResultDetails` for public web tool result presentation. Search cards preserve provider, truncation and empty-result information; WebFetch and Http results preserve the original body, actual HTTP status and truncation information.
- Preserves the existing `ToolCardArtifact` enum usage. Frozen v1 wire contract revision 8 is unchanged.
- Includes the current SDK fixes and validates the current standalone Demo source against the binary products. Web tools still execute on the developer's serve host and follow the shared permissions flow.

## Products and compatibility

`TansrCore`, `TansrClient`, and `TansrUI` each include their SDK dependency closure. Supports iOS 16+ arm64 devices, arm64/x86_64 simulators, and macOS 13+ arm64/x86_64. Do not mix source and binary SDK modules in one dependency graph.

Source revision: `6343d52507506cd48088c12f9abd45150a3e307a`.

Built with Xcode 26.6 (17F113), Apple Swift 6.3.3, Swift 5 language mode and library evolution. This distribution contains interfaces and binary artifacts, not SDK implementation source or credentials.

## Validation

- Full native Swift test run: 363 tests passed, zero failures. A separate 12-test contract run is a subset, not an additional total.
- Binary packaging scripts: 4 tests passed; ZIP safety audit: 12 tests passed.
- Nine framework archives cover the three modules and all three platforms. Actual binary architectures and stable interfaces were verified.
- Independent macOS consumers for all three products compiled, linked and ran construction-only checks; the complete standalone Demo compiled. The iOS arm64 and simulator arm64/x86_64 interfaces and complete Demo typechecked after removing serialized modules from isolated consumer copies.
- This SDK release does not include an IPA, application signing, physical-device validation, or a paid model test.

Each immutable ZIP checksum is recorded in `Package.swift`, `SHA256SUMS`, and the attached `manifest.json`. The previously published `0.2.1` assets remain unchanged.

官网: https://www.tansr.com/  
开发文档: https://docs.tansr.com/
