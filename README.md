# WikiCite
Easy Wikipedia style citations using jQuery.

## Usage
To use WikiCite, first create either an inline or linked citation.
### Inline
``` html

<span data-inline-citation="Put citation text here">Content that the citation is attached to.</span>

```
### Linked
``` js

var linkedCitations = [
  new Citation("identifier", "Citation text")
];

```
...
``` html

<span data-linked-citation="identifier">Content that the citation is attached to.</span>

```

Once you have input citations, you can then call:
``` js
$("body").cite(linkedCitations, [configuration, callback]);
```
to automatically create citation markers.

You can also add a general reference box by creating a container with the id "complete-citation-container", like such:
``` html
<div id="complete-citation-container"></div>
```

## Configuration
WikiCite can be configured by an optional configuration object
``` js
CitationConfiguration(
	enableCompleteCitationContainer = true, // Enable the general reference box
	completeCitationContainer = "#complete-citation-container", // Set the id of the general reference box container
	completeCitationContainerTitle = "<h2>References</h2>", // Set the title of the general reference box
	enableHoverContainer = true, // Enable the hover reference box
	hoverArrowOffset = 30, // Where the center of the hover arrow is
	hoverContainerFadeLength = 50) // How long the hover box fade should take
```

## Future
* I plan on adding structured citations with formatting
* I also plan on adding little "link to use" markers to the general reference box
