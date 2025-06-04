import React, { useState, useMemo } from 'react';
import './MainContainer.css';

// PUBLIC_INTERFACE
export interface Note {
  id: string;
  title: string;
  content: string;
  category: string;
}

// PUBLIC_INTERFACE
export const MainContainer: React.FC = () => {
  // State: list of notes
  const [notes, setNotes] = useState<Note[]>([]);
  // Current editing note
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  // Input fields
  const [titleInput, setTitleInput] = useState('');
  const [contentInput, setContentInput] = useState('');
  const [categoryInput, setCategoryInput] = useState('');
  // Search and filter
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Derived unique categories
  const categories = useMemo(() => {
    const cats = notes.map(n => n.category).filter(c => c);
    return Array.from(new Set(cats));
  }, [notes]);

  // Handle saving (create or update)
  const saveNote = () => {
    if (!titleInput.trim() && !contentInput.trim()) return;
    if (editingNote) {
      // Update existing
      setNotes(prev =>
        prev.map(n =>
          n.id === editingNote.id
            ? { ...n, title: titleInput, content: contentInput, category: categoryInput }
            : n
        )
      );
    } else {
      // Create new
      const newNote: Note = {
        id: Date.now().toString(),
        title: titleInput,
        content: contentInput,
        category: categoryInput,
      };
      setNotes(prev => [newNote, ...prev]);
    }
    clearForm();
  };

  const clearForm = () => {
    setEditingNote(null);
    setTitleInput('');
    setContentInput('');
    setCategoryInput('');
  };

  const editNote = (note: Note) => {
    setEditingNote(note);
    setTitleInput(note.title);
    setContentInput(note.content);
    setCategoryInput(note.category);
  };

  const deleteNote = (id: string) => {
    setNotes(prev => prev.filter(n => n.id !== id));
  };

  // Filtered and searched notes
  const displayedNotes = useMemo(() => {
    return notes.filter(n => {
      const matchesSearch =
        n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        n.content.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory ? n.category === activeCategory : true;
      return matchesSearch && matchesCategory;
    });
  }, [notes, searchTerm, activeCategory]);

  return (
    <div className="main-container">
      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search notes..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Category Filters */}
      <div className="category-chips">
        <button
          className={`chip ${activeCategory === null ? 'active' : ''}`}
          onClick={() => setActiveCategory(null)}
        >
          All
        </button>
        {categories.map(cat => (
          <button
            key={cat}
            className={`chip ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Notes List */}
      <div className="notes-list">
        {displayedNotes.map(note => (
          <div key={note.id} className="note-card">
            <div className="note-header">
              <h3>{note.title || 'Untitled'}</h3>
              <div className="note-actions">
                <button onClick={() => editNote(note)}>Edit</button>
                <button onClick={() => deleteNote(note.id)}>Delete</button>
              </div>
            </div>
            <p>{note.content.slice(0, 100)}{note.content.length > 100 ? '...' : ''}</p>
            {note.category && <span className="note-category">{note.category}</span>}
          </div>
        ))}
        {displayedNotes.length === 0 && <p className="no-notes">No notes found.</p>}
      </div>

      {/* Note Form */}
      <div className="note-form">
        <input
          type="text"
          placeholder="Title"
          value={titleInput}
          onChange={e => setTitleInput(e.target.value)}
        />
        <textarea
          placeholder="Content"
          value={contentInput}
          onChange={e => setContentInput(e.target.value)}
        />
        <input
          type="text"
          placeholder="Category"
          value={categoryInput}
          onChange={e => setCategoryInput(e.target.value)}
        />
        <button className="save-btn" onClick={saveNote}>
          {editingNote ? 'Update Note' : 'Add Note'}
        </button>
        {editingNote && (
          <button className="cancel-btn" onClick={clearForm}>
            Cancel
          </button>
        )}
      </div>

      {/* Floating Action Button */}
      <button className="fab" onClick={clearForm}>
        +
      </button>
    </div>
  );
};
