/// Data classes

class Discussion {
#students = [];
get students () {return this.#students;}

addStudent (s) {this.#students.push(s);}

toString () {
return `<div class="discussion">
<h1 class="info">Discussion</h1>

<div class="students">
${this.#students.length > 0? toList(this.#students) : ""}
</div><!-- .students -->
</div><!-- .discussion -->
`; // return
}; // toString
}; // class Discussion

class Student {
#name = "";
#votes = 0;
#documents = [];
get name () {return this.#name;}
get documents () {return this.#documents;}

constructor (name) {this.#name = name;}

addVote () {this.#votes += 1;}
removeVote () {if (votes > 0) this.#votes -= 1;}
addDocument (d) {this.#documents.push(d);}

toString () {
return `<div class="student">
<h2 class="info">${this.#name}: (${this.#votes} votes), ${this.#documents.length} documents</h2>

<div class="documents">
${this.#documents.length === 0? "no documents to discuss" : toList(this.#documents)}
</div><!-- .documents -->
</div><!-- .student -->
`; // return
} // toString
}; // class Student

class Document {
#title = "";
#url = "";
#votes = 0;
#comments = [];
get comments () {return this.#comments;}

constructor (title, url) {
this.#title = title;
this.#url = url;
}

addVote () {this.#votes += 1;}
removeVote () {if (votes > 0) this.#votes -= 1;}
addComment (c) {this.#comments.push(c);}

toString () {
return `<div class="document">
<h3 class="info">
<a href="$this.#url}">${this.#title}</a>
</h3>

<div class="comments">
${this.#comments.length === 0? "no comments" : toList(this.#comments, "ol")}
</div><!-- .comments -->
</div><!-- .document -->
`; // return
} // toString
}; // class Document

class Comment {
#author = null;
#text = "";
#votes = 0;
#replies = [];
get replies () {return this.#replies;}


constructor (author, text) {
this.#author = author;
this.#text = text;
} // constructor

addVote () {this.#votes += 1;}
removeVote () {if (votes > 0) this.#votes -= 1;}
addComment (c) {this.#replies.push(c);}

toString () {
return `<div class="comment">
<div class="info">From ${this.#author.name} (${this.#votes} votes):
<br>${this.#text}
</div>

<div class="replies">
${this.#replies.length === 0? "" : toList(this.#replies, "ol")}
</div><!-- .replies -->
</div><!-- .comment -->
`; // return
} // toString
}; // class Comment


/// operators

function toList (l, type = "ul") {
return `<${type}><li>
${l.join("\n</li><li>\n")}
</li></${type}>
`;
} // toList

/// test data

discussion = new Discussion();
const Rich = new Student("Rich")
const Mary = new Student ("Mary")

discussion.addStudent(Rich);
discussion.addStudent(Mary);


Rich.addDocument(new Document("Numbering nested lists via CSS", "https://example.com/nested.html"));
Rich.addDocument(new Document("Navigation of deeply nested structures using HTML trees", "https://example.com/trees.html"));

Rich.documents[1].addComment(new Comment(Mary, "HTML trees are cool, but a pain to construct."));
Rich.documents[1].comments[0].addComment(new Comment(Rich, "but in the right circumstance they can afford better UX for screen reader users"));

