// Data: Key code snippets for LocalMind RAG System

export interface CodeSnippet {
  id: string;
  title: string;
  filePath: string;
  language: string;
  description: string;
  code: string;
}

export const codeSnippets: CodeSnippet[] = [
  {
    id: "incremental-indexing",
    title: "SHA-256 Incremental Scanner",
    filePath: "src/localmind/indexer/scanner.py",
    language: "python",
    description: "Implements delta-indexing using content hashing. Only re-processes files when SHA-256 signatures change, drastically reducing CPU/IO for large local directories.",
    code: `def compute_hash(path: Path) -> str:
    """Compute SHA-256 hash of a file."""
    h = hashlib.sha256()
    with open(path, "rb") as f:
        for block in iter(lambda: f.read(65536), b""):
            h.update(block)
    return h.hexdigest()

def scan_directories(config: LocalMindConfig, paths: list[Path]):
    """Walk directories with delta awareness."""
    for path in base_dir.rglob("*"):
        old_state = registry.get_file_state(path_str)
        if old_state and abs(old_state["mtime"] - mtime) < 0.1:
            status = "unchanged" # Skip re-processing
        else:
            content_hash = compute_hash(path)
            status = "modified" if old_state["content_hash"] != content_hash else "unchanged"`
  },
  {
    id: "hybrid-search",
    title: "RRF-based Hybrid Retrieval",
    filePath: "src/localmind/retrieval/search.py",
    language: "python",
    description: "Combines semantic vector search with keyword-based BM25 using Reciprocal Rank Fusion (RRF). Ensures optimal recall for both abstract concepts and exact technical terms.",
    code: `def reciprocal_rank_fusion(semantic_results, keyword_results, k=60):
    """Merge two ranked result lists using RRF."""
    scores = {}
    for rank, item in enumerate(semantic_results):
        doc_id = item["id"]
        scores[doc_id] = scores.get(doc_id, 0) + 1.0 / (rank + k)

    for rank, item in enumerate(keyword_results):
        doc_id = item["id"]
        scores[doc_id] = scores.get(doc_id, 0) + 1.0 / (rank + k)

    # Sort by fused score descending
    return sorted(scores.items(), key=lambda x: x[1], reverse=True)`
  },
  {
    id: "ast-parser",
    title: "AST-based Python Parser",
    filePath: "src/localmind/indexer/parser.py",
    language: "python",
    description: "Uses Python's Abstract Syntax Tree (AST) to intelligently extract docstrings, function signatures, and class definitions for high-fidelity code indexing.",
    code: `def _parse_python(path: Path) -> ParsedResult:
    text = path.read_text(encoding="utf-8")
    tree = ast.parse(text)
    names, docstrings = [], []
    
    for node in ast.walk(tree):
        if isinstance(node, ast.FunctionDef):
            names.append(f"def {node.name}")
            if ast.get_docstring(node):
                docstrings.append(ast.get_docstring(node))
        elif isinstance(node, ast.ClassDef):
            names.append(f"class {node.name}")
            
    meta = _base_metadata(path)
    meta["section_title"] = ", ".join(names[:5])
    return text, meta`
  },
  {
    id: "llm-grounding",
    title: "Context-Grounded Generation",
    filePath: "src/localmind/generator/gemini.py",
    language: "python",
    description: "Strict grounding logic that passes retrieved local context to Gemini with a 'Source-Only' mandate, ensuring answers are derived solely from personal data.",
    code: `def generate_answer(query: str, context_chunks: list[str]):
    """Generate answer with strict local grounding."""
    prompt = f"""
    ### CONTEXT:
    {chr(10).join(context_chunks)}
    
    ### TASK:
    Answer the user query based ONLY on the context above. 
    If the information is missing, say "I don't know based on your files."
    
    ### QUERY:
    {query}
    """
    response = model.generate_content(prompt)
    return response.text`
  }
];

export default codeSnippets;