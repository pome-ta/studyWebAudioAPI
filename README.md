# studyWebAudioAPI




[mmckegg / web-audio-school](https://github.com/mmckegg/web-audio-school)

## キー指定の計算

[http://mmckegg.github.io/web-audio-school/](http://mmckegg.github.io/web-audio-school/)


### Chromatic Scale

```
                         -3  -1   1       4   6       9   11
                       -4  -2   0   2   3   5   7   8   10  12
  .___________________________________________________________________________.
  :  | |  |  | | | |  |  | | | | | |  |  | | | |  |  | | | | | |  |  | | | |  :
  :  | |  |  | | | |  |  | | | | | |  |  | | | |  |  | | | | | |  |  | | | |  :
  :  | |  |  | | | |  |  | | | | | |  |  | | | |  |  | | | | | |  |  | | | |  :
<-:  |_|  |  |_| |_|  |  |_| |_| |_|  |  |_| |_|  |  |_| |_| |_|  |  |_| |_|  :->
  :   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   :
  : A | B | C | D | E | F | G | A | B | C | D | E | F | G | A | B | C | D | E :
  :___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___: 
    ^                           ^           ^               ^           ^
  220 Hz                      440 Hz      523.25 Hz       880 Hz     1174.65 Hz
(-1 Octave)                 (middle A)                 (+1 Octave)

```

#### A(440) -> E

```js
oscillator.frequency.value = 440 * Math.pow(2, 7 / 12) // 659.255...
```

#### A(440) -> G

```js
oscillator.frequency.value = 440 * Math.pow(2, -14 / 12) // 195.998...
```





## classわけわけ

Pythonic な書き方になりそうだけど

### import / export

- import 時の波括弧`{ hoge }` は、`export default` を使ってないとき
- export は、`export default` 推奨


[02.とりあえず音を出す](https://www.g200kg.com/jp/docs/webaudio/generatesound.html)



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

