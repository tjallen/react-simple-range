## Slider examples

```js
<ReactSimpleRange step={10} defaultValue={5} label sliderColor="red" />

```

With onChange (log state to console, spammily)

```js
<ReactSimpleRange onChange={(e) => console.log('state from onChange:', e)} />
```

With onChangeComplete (also logs to console on interaction end)

```js
<ReactSimpleRange onChangeComplete={(e) => console.log('state from onChangeComplete:', e)} />
```

Custom colors
    
```js
<ReactSimpleRange sliderColor="aliceblue" thumbColor="aquamarine" trackColor="rebeccapurple" />
```

Custom range (min, max props)

```js
<ReactSimpleRange min={0} max={5} label />
```

Custom step value
```js
<ReactSimpleRange step={10} label />
```
