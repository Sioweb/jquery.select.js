# jquery.select.js

Replaces select inputs with a dropdown list

## How to use

### HTML

```
<select name="xy" id="xy" size="1">...</select>
```

### Script

```
$(function() {
  $('select').select();
});
```

If the list went out of the container and isnt visible because its overflow:hidden, you can add the parent container as option:

```
$(function() {
  $('select').select({
    container: '#parentContainer'
  });
});
```
