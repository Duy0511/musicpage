import React, { useState } from 'react';

function SongList() {
  const [songs, setSongs] = useState([
    {
      id: 1,
      name: 'Song 1',
      art: 'Artist 1',
      image: 'https://example.com/song-1.jpg',
    },
    {
      id: 2,
      name: 'Song 2',
      art: 'Artist 2',
      image: 'https://example.com/song-2.jpg',
    },
    {
      id: 3,
      name: 'Song 3',
      art: 'Artist 3',
      image: 'https://example.com/song-3.jpg',
    },
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);

  function addActiveClassToSong(songElement) {
    songElement.classList.add('active');
  }

  useEffect(() => {
    // Thêm lớp active vào song hiện tại
    const currentSongElement = document.querySelector('.song.active');
    if (currentSongElement) {
      addActiveClassToSong(currentSongElement);
    }
  }, [currentIndex]);

  function handleSongClick(index) {
    setCurrentIndex(index);
  }

  const html = songs.map((song, index) => {
    return (
      <div
        key={song.id}
        className={`song ${index === currentIndex ? 'active' : ''}`}
        onClick={() => handleSongClick(index)}
      >
        <div className="thumb" style={{ backgroundImage: `url('${song.image}')` }}></div>
        <div className="body">
          <h3 className="title">{song.name}</h3>
          <p className="author">{song.art}</p>
        </div>
        <div className="option"><i className="fa-solid fa-list"></i></div>
      </div>
    );
  });

  return <div>{html}</div>;
}

export default SongList;
