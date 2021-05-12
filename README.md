# studyWebAudioAPI


[Web Audio API | MDN Web Docs](https://developer.mozilla.org/ja/docs/Web/API/Web_Audio_API#guides_and_tutorials)


## 概念

- 音声操作を`AudioContex` 内の操作として実現
- 基本的な操作は`AudioNode` として表現、接続を`audio routing graph`
- 異なる複数音源も1つの Contex で扱える

sound intensities (samples)
- 数学的に計算されたもの
  - [`OscillatorNode`](https://developer.mozilla.org/ja/docs/Web/API/OscillatorNode) など
- 音声ファイルや動画ファイル
  - [`AudioBufferSourceNode`](https://developer.mozilla.org/ja/docs/Web/API/AudioBufferSourceNode)
  - [`MediaElementAudioSourceNode`](https://developer.mozilla.org/en-US/docs/Web/API/MediaElementAudioSourceNode)
- オーディオストリーム
  - [`MediaStreamAudioSourceNode`](https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamAudioSourceNode)


Web Audio API 理論の詳細 -> [Basic concepts behind Web Audio API](https://developer.mozilla.org/ja/docs/Web/API/Web_Audio_API/Basic_concepts_behind_Web_Audio_API)

