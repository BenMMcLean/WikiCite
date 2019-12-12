function Citation(id, rawCitation) {
	this.id = id;
	this.rawCitation = rawCitation;
	this.ref = null;
	
	this.citationText = function() { return rawCitation; }
}

function CitationConfiguration(
	enableCompleteCitationContainer = true,
	completeCitationContainer = "#complete-citation-container",
	completeCitationContainerColumns = 3,
	enableHoverContainer = true,
	hoverArrowOffset = 30,
	hoverContainerFadeLength = 50) {
		
	this.completeCitationContainer = completeCitationContainer;
	this.enableCompleteCitationContainer = enableCompleteCitationContainer;
	this.completeCitationContainerColumns = completeCitationContainerColumns;
	this.enableHoverContainer = enableHoverContainer;
	this.hoverArrowOffset = hoverArrowOffset;

}

(function($) {

	var INLINE_CITATION_NAME = "data-inline-citation";
	var LINKED_CITATION_NAME = "data-linked-citation";
	
	var HOVER_CONTAINER_NAME = "citation-hover";
	
	$.fn.cite = function(citations = [], configuration = new CitationConfiguration()) {
		new _CiteExecute(citations, configuration).execute(this);
	}
	
	function _CiteExecute(citations, configuration) {
		this.citations = citations;
		this.configuration = configuration;
		this.usedCitations = []
		
		this.execute = function(el) {
			createHover();
			this.processCitations(el);
		}
		
		this.processCitations = function (el) {
			var usedCitations = [];
			var usedCitationMap = {};
			var citationCount = 0;
			
			var _this = this;
			
			el.each(function () {
				$(this).find("["+INLINE_CITATION_NAME+"]").each(function() {
					var citation = new Citation(null, $(this).attr(INLINE_CITATION_NAME));
					
					console.log(citation);
					
					citationCount++;
					citation.ref = citationCount;
					
					usedCitations.push(citation);
					
					_this.setupCitation(this, citation);
				});
				
				$(this).find("["+LINKED_CITATION_NAME+"]").each(function() {
					var citation = _this.findCitation($(this).attr(LINKED_CITATION_NAME));
					
					if (citation == null) return;
					
					if (citation.ref == null) {
						citationCount++;
						citation.ref = citationCount;
					}
					
					if (!(citation.id in usedCitationMap)) {
						usedCitations.push(citation);
						usedCitationMap[citation.id] = 0;
					}
					
					_this.setupCitation(this, citation);
				});
				
				this.usedCitations = usedCitations;
			});
		}
		
		this.setupCitation = function(el, citation) {
			var _this = this;
			var hoverable;
			if (configuration.enableCompleteCitationContainer) {
				hoverable = $("<a href='#ref"+ citation.ref +"' class='citation-mark'>[" + citation.ref + "]</a>").appendTo(el); 
			} else {
				hoverable = el;
			}
			
			if (configuration.enableHoverContainer) {
				$(hoverable).hover(function() {
					var hoverableOffset = $(this).offset();
					var hoverableHeight = $(this).height();
					var hoverableWidth = $(this).width();
					var me = $("#" + HOVER_CONTAINER_NAME);
					
					me.html(citation.citationText());
					me.css({
						left: hoverableOffset.left - (hoverableWidth / 2) - configuration.hoverArrowOffset,
						top: hoverableOffset.top - me.height() - configuration.hoverArrowOffset
					});
					me.stop().fadeIn(_this.configuration.hoverContainerFadeLength);
				}, function() {
					$("#" + HOVER_CONTAINER_NAME).stop().fadeOut(_this.configuration.hoverContainerFadeLength);
				});
			}
		}
		
		this.findCitation = function(id) {
			for (var i = 0; i < citations.length; i++) {
				if (citations[i].id == id) return citations[i];
			}
		}
	}
	
	function createHover() {
		if ($("#" + HOVER_CONTAINER_NAME).length) {
			return;
		}
		
		$("body").append("<div id='citation-hover'></div>");
	}
	
}( jQuery ));