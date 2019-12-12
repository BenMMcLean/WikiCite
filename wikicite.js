function Citation(id, rawCitation) {
	this.id = id;
	this.rawCitation = rawCitation;
	this.ref = null;
	
	this.citationText = function() { return rawCitation; }
}

function CitationConfiguration(
	citations = [], 
	completeCitationContainer = new CompleteCitationContainer(),
	linkToComplete = true,
	enableHoverContainer = true) {
		
	this.citations = citations;
	this.completeCitationContainer = completeCitationContainer;
	this.linkToComplete = linkToComplete;
	this.enableHoverContainer = enableHoverContainer;
	
	this.findCitation = function(id) {
		for (var i = 0; i < citations.length; i++) {
			if (citations[i].id == id) return citations[i];
		}
	}
}

function CompleteCitationContainer(
	root = ".complete-citation-container",
	columns = 3) {
	
	this.root = root;
	this.columns = columns;
	
}

(function($) {

	var INLINE_CITATION_NAME = "data-inline-citation";
	var LINKED_CITATION_NAME = "data-linked-citation";
	
	$.fn.cite = function(configuration = new CitationConfiguration()) {
		var citations = findCitations(this);
	}
	
	function findCitations(root, configuration) {
		var usedCitations = [];
		var usedCitationMap = {};
		var citationCount = 0;
		
		root.each(function () {
			$(this).find("["+INLINE_CITATION_NAME+"]").each(function() {
				var citation = new Citation(null, $(this).attr(INLINE_CITATION_NAME));
				
				console.log(citation);
				
				citationCount++;
				citation.ref = citationCount;
				
				usedCitations.push(citation);
			});
			
			$(this).find("["+LINKED_CITATION_NAME+"]").each(function() {
				var citation = configuration.findCitation($(this).attr(LINKED_CITATION_NAME));
				
				if (citation == null) return;
				
				citationCount++;
				citation.ref = citationCount;
				
				if (!citation.id in usedCitationMap) {
					usedCitations.push(citation);
					usedCitationMap[citation.id] = 0;
				}
			});
			
			return usedCitations;
		});
	}
	
	function createHoverContainer() {
		
	}
	
}( jQuery ));