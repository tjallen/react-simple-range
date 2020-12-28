With onChange (log state to console on every mouse/touchmove event, when slider value changes)

```js
<ReactSimpleRange onChange={s => console.log('state from onChange:', s)} />
```

With onChangeComplete (also logs to console on interaction end)

```js
<ReactSimpleRange onChangeComplete={s => console.log('state from onChangeComplete:', s)} />
```

Custom colors
    
```js
<ReactSimpleRange sliderColor="aliceblue" thumbColor="rebeccapurple" trackColor="aquamarine" />
```

Custom range (min, max props)

```js
<ReactSimpleRange min={0} max={5} label onChangeComplete={(s, id) => console.log(s, id)} />
```

Custom step value (step through values in multiples of 10)
```js
<ReactSimpleRange step={10} label onChange={s => console.log(s)} />
```

Vertical slider
```js
<ReactSimpleRange vertical label />
```

Disable thumb
```js
<ReactSimpleRange disableThumb />
```

Disable track
```js
<ReactSimpleRange disableTrack />
```

Custom thumb element
```js
<ReactSimpleRange customThumb={<div style={{ border: '1px solid black', height: 6, width: 10, background: 'white'}} />} />
```

Default value
```js
<ReactSimpleRange defaultValue={70} />
```

Using id prop
```js
<ReactSimpleRange id="mySlider" onChange={(s, id) => console.log(`value of ${id} is ${s.value}`)} />
```
