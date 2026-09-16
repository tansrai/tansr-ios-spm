# Tansr iOS SDK

Public binary Swift package, version **0.3.0**. Three XCFrameworks are downloaded over HTTPS and verified by SwiftPM checksums. This repository contains distribution metadata; the SDK implementation is not included.

## Requirements

iOS 16+ (arm64), iOS Simulator (arm64 / x86_64), macOS 13+ (arm64 / x86_64). Use a compatible Xcode / Swift toolchain as recorded in the release notes. The deployment target and the build toolchain version are separate requirements.

## Integrate

Add this package in Xcode: https://github.com/tansrai/tansr-ios-spm.git, exact version 0.3.0.

```swift
.package(url: "https://github.com/tansrai/tansr-ios-spm.git", exact: "0.3.0")
// In your target dependencies:
.product(name: "TansrClient", package: "tansr-ios-spm")
.product(name: "TansrUI", package: "tansr-ios-spm") // Optional SwiftUI components
```

Imports remain `TansrCore`, `TansrClient`, and `TansrUI`. Select only the products needed by your app; each includes its SDK dependencies. Use the binary package alone in an app dependency graph to avoid duplicate module definitions.

No repository credentials are required. AppKey, upstream credentials and OSS keys belong on your server; mobile apps use the serve endpoint and a user login token.

## Documentation / 技术文档

- [Website / 官网](https://www.tansr.com/)
- [Developer documentation / 开发文档](https://docs.tansr.com/)
- The distributed iOS Demo includes `SDK-INTEGRATION-IOS.md` and a sanitized client configuration. Its companion serve-demo has its own server integration guide.

本包通过公开清单与远端 XCFramework 分发，无需私有仓库权限。版本与校验和固定，发布资产不可覆盖。iOS App 的工程配置、签名和安装由应用开发者完成。
