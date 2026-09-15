# Tansr iOS SDK 0.2.1

First public binary SwiftPM distribution: three remote XCFrameworks with pinned SHA256 checksums. Package/module names preserve TansrCore, TansrClient and TansrUI; SDK implementation source is not distributed here.

- iOS 16+: arm64 devices; arm64 and x86_64 simulators.
- macOS 13+: arm64 and x86_64.
- Built and validated with Xcode 26.6 (17F113), Apple Swift 6.3.3, Swift 5 language mode and library evolution enabled. Use that toolchain or a compatible newer version; older Xcode versions have not been validated.
- Three independent macOS consumers compiled, linked and ran; the complete standalone Demo compiled. Device and both simulator architectures compiled the Demo from stable Swift interfaces.
- Original SDK tests on macOS: 265 passed; distribution scripts: 4 passed; binary archive audit: 12 passed.

Mobile applications authenticate through the developer login service and connect to serve. AppKey, OSS credentials and signing secrets remain on the developer server. No iOS app/IPA signing or physical-device validation is claimed by this SDK release.

本版改用公开清单与远端二进制分发，无需私有仓库权限。三份 ZIP 合计约 3.8 MB；SwiftPM 按平台选择相应切片。独立 iOS Demo 随包提供技术手册、脱敏配置和公开依赖锁定。

Validation was performed on a Mac with the toolchain recorded above.

[官网](https://www.tansr.com/) · [开发文档](https://docs.tansr.com/)
