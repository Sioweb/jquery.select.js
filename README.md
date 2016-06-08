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

<table>
	<thead>
		<tr>
			<th>Option</th>
			<th>Werte</th>
			<th>Beschreibung</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>container: document</td>
			<td>Selector</td>
			<td>Der Eltern-Container damit die Select-Box ggf. nach oben aufgeht</td>
		</tr>
		<tr>
			<td>label: '%s'</td>
			<td>string</td>
			<td>Bitte wählen sie %s Objekte aus:</td>
		</tr>
		<tr>
			<td>options: '%s'</td>
			<td>string</td>
			<td>Jede Option kann so Dynamisch erweitert werden: Anzeige: %s</td>
		</tr>
		<tr>
			<td>maxOffset: 99999</td>
			<td>int/float [0-9]</td>
			<td>Gibt an, wie weit die geöffnete Select-Box verschoben werden darf.</td>
		</tr>
	</tbody>
</table>
