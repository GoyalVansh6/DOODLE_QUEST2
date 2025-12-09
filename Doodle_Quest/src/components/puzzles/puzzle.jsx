import React, { useState, useEffect } from "react";

export default function JigsawPuzzle({ imageUrl }) {
  const [pieces, setPieces] = useState([]);
  const [placed, setPlaced] = useState({});
  const gridSize = 3; // change to 4 or 5 for difficulty

  useEffect(() => {
    if (imageUrl) sliceImage(imageUrl);
  }, [imageUrl]);

  const sliceImage = (src) => {
    const img = new Image();
    img.crossOrigin = "anonymous"; // needed if server uses CORS
    img.src = src;

    img.onload = () => {
      const pieceSize = 300 / gridSize;
      let newPieces = [];

      for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
          newPieces.push({
            id: `${x}-${y}`,
            x, y,
            background: `url(${src})`,
            backgroundPosition: `-${x * pieceSize}px -${y * pieceSize}px`,
            backgroundSize: `${300}px ${300}px`,
          });
        }
      }

      setPieces(shuffle(newPieces));
    };
  };

  const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

  const onDragStart = (e, id) => {
    e.dataTransfer.setData("id", id);
  };

  const onDrop = (e, cellId) => {
    const id = e.dataTransfer.getData("id");
    setPlaced((prev) => ({ ...prev, [cellId]: id }));
  };

  const isSolved = () => {
    return pieces.every((p) => placed[p.id] === p.id);
  };

  // Inline CSS styling
  const styles = {
    container: {
      maxWidth: "700px",
      margin: "auto",
      textAlign: "center",
      fontFamily: "sans-serif",
    },
    grid: {
      display: "grid",
      gap: "4px",
      marginTop: "20px",
      gridTemplateColumns: `repeat(${gridSize}, 100px)`,
      gridTemplateRows: `repeat(${gridSize}, 100px)`,
    },
    cell: {
      width: "100px",
      height: "100px",
      border: "2px dashed #777",
    },
    piece: {
      width: "100%",
      height: "100%",
      cursor: "grab",
    },
    pool: {
      display: "flex",
      flexWrap: "wrap",
      gap: "6px",
      justifyContent: "center",
      marginTop: "15px",
    },
    success: {
      color: "green",
      marginTop: "20px",
      fontSize: "24px",
    },
  };

  return (
    <div style={styles.container}>
      <h1>React Jigsaw Puzzle</h1>

      {!imageUrl && (
        <p style={{ color: "red" }}>No image URL provided.</p>
      )}

      <div>
        <h3>Place Pieces Here</h3>

        <div style={styles.grid}>
          {Array.from({ length: gridSize * gridSize }).map((_, i) => {
            const x = i % gridSize;
            const y = Math.floor(i / gridSize);
            const id = `${x}-${y}`;

            const pieceId = placed[id];
            const piece = pieces.find((p) => p.id === pieceId);

            return (
              <div
                key={id}
                style={styles.cell}
                onDrop={(e) => onDrop(e, id)}
                onDragOver={(e) => e.preventDefault()}
              >
                {piece && (
                  <div
                    style={{
                      ...styles.piece,
                      backgroundImage: piece.background,
                      backgroundPosition: piece.backgroundPosition,
                      backgroundSize: piece.backgroundSize,
                    }}
                    draggable
                    onDragStart={(e) => onDragStart(e, piece.id)}
                  ></div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <h3>Available Pieces</h3>

        <div style={styles.pool}>
          {pieces
            .filter((p) => !Object.values(placed).includes(p.id))
            .map((p) => (
              <div
                key={p.id}
                style={{
                  ...styles.piece,
                  width: "100px",
                  height: "100px",
                  backgroundImage: p.background,
                  backgroundPosition: p.backgroundPosition,
                  backgroundSize: p.backgroundSize,
                }}
                draggable
                onDragStart={(e) => onDragStart(e, p.id)}
              ></div>
            ))}
        </div>
      </div>

      {isSolved() && (
        <h2 style={styles.success}>🎉 Puzzle Solved!</h2>
      )}
    </div>
  );
}
