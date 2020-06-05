import React, { useState, useEffect } from "react";
import classnames from "classnames";
import _ from "lodash";

import croixRouge from "./assets/images/croix-rouge-am.png";
import underscore from "./assets/images/underscore.png";
import "./App.css";

function App() {
  const [alphabet] = useState("abcdefghijklmnopqrstuvwxyz");
  const [alphabetArray, setAlphabetArray] = useState();
  const [gameHasStarted, setGameHasStarted] = useState(false);
  const [gameIsLost, setGameIsLost] = useState(false);
  const [gameIsWon, setGameIsWon] = useState(false);
  const [wordToFind, setWordToFind] = useState();
  const [wordToFindArray, setWordToFindArray] = useState();
  const [lettersChosen, setLettersChosen] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [remainingLetters, setRemainingLetters] = useState();

  // watchers
  // useEffect(() => {
  //   console.log("lettersChosen ", lettersChosen);
  //   console.log("wordToFind ", wordToFind);
  //   console.log("wordToFindArray ", wordToFindArray);
  //   console.log("wrongLetters ", wrongLetters);
  //   console.log("remainingLetters ", remainingLetters);
  // }, [
  //   lettersChosen,
  //   wordToFind,
  //   wordToFindArray,
  //   wrongLetters,
  //   remainingLetters,
  // ]);

  // watcher qui s'exécute à chaque fois que wrongLetters change
  useEffect(() => {
    console.log(gameHasStarted);
    console.log(remainingLetters);
    // si on a choisies 8 lettres qui ne sont pas dans le mot à trouver
    if (wrongLetters.length >= 8) {
      // la partie est perdue
      setGameIsLost(true);
    }

    // si il reste 0 lettres à trouver
    if (gameHasStarted && remainingLetters.length === 0) {
      // on a gagné
      setGameIsWon(true);
    }
  }, [wrongLetters, remainingLetters, gameHasStarted]);

  function startGame() {
    setGameHasStarted(true);

    // on transforme les chaînes de caractère en tableaux pour pouvoir mapper dessus dans le return
    setAlphabetArray(alphabet.split(""));
    setWordToFindArray(wordToFind.toUpperCase().split(""));
    setRemainingLetters(_.uniq(wordToFind.toUpperCase().split("")));
  }

  function letterClick(letter) {
    // on ajoute la lettre aux lettres que l'on a choisies
    setLettersChosen([...lettersChosen, letter.toUpperCase()]);

    // si la lettre sur laquelle on a cliquée n'est pas dans le mot à trouver
    if (
      !wordToFindArray.includes(letter.toUpperCase()) &&
      !lettersChosen.includes(letter.toUpperCase())
    ) {
      // on ajoute la lettre aux lettres qui sont fausses
      setWrongLetters([...wrongLetters, letter.toUpperCase()]);
    }

    if (remainingLetters.includes(letter.toUpperCase())) {
      setRemainingLetters(
        remainingLetters.filter((l) => l !== letter.toUpperCase())
      );
    }
  }

  function playAgain() {
    // on reset tout
    setGameIsWon(false);
    setGameIsLost(false);
    setGameHasStarted(false);
    setLettersChosen([]);
    setWrongLetters([]);
  }

  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <div className="col s12">
            <h1>Jeu du Pendu</h1>
          </div>
          <div className="row">
            {!gameHasStarted ? (
              <div class="row">
                <form class="col s12">
                  <div class="row">
                    <div class="input-field col s12">
                      <input
                        placeholder="Entrez un mot à faire deviner"
                        id="word"
                        type="text"
                        class="validate"
                        onChange={(e) => setWordToFind(e.target.value)}
                      />
                    </div>
                    <button className="button-replay btn" onClick={startGame}>
                      Jouer
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <>
                {!gameIsWon && !gameIsLost && (
                  <>
                    <div className="col s9">
                      <div class="board">
                        {wordToFindArray &&
                          wordToFindArray.map((letter) => (
                            <>
                              {lettersChosen.includes(letter) ? (
                                <div className="word-to-find-letter">
                                  {letter.toUpperCase()}
                                </div>
                              ) : (
                                <img
                                  src={underscore}
                                  alt="Underscore"
                                  className="underscore"
                                />
                              )}
                            </>
                          ))}
                      </div>
                      <div className="letters-container">
                        {alphabetArray &&
                          alphabetArray.map((letter) => (
                            <div
                              className={`letter ${classnames({
                                "chosen-letter": lettersChosen.includes(
                                  letter.toUpperCase()
                                ),
                              })}`}
                              onClick={() => letterClick(letter)}
                            >
                              {letter.toUpperCase()}
                            </div>
                          ))}
                      </div>
                    </div>
                    <div className="col s3 fautes">
                      <h2>Fautes</h2>
                      {wrongLetters &&
                        wrongLetters.map((index) => (
                          <img
                            src={croixRouge}
                            key={index}
                            alt="Faute"
                            className="faute-croix"
                          />
                        ))}
                      <p>{8 - wrongLetters.length} essais restants</p>
                    </div>
                  </>
                )}
              </>
            )}
            {gameIsLost && (
              <div className="col s12 lost">
                <p>La partie est perdue !</p>
                <button className="button-replay btn" onClick={playAgain}>
                  Rejouer
                </button>
              </div>
            )}
            {gameIsWon && (
              <div className="col s12 lost">
                <p>La partie est gagnée !</p>
                <button className="button-replay btn" onClick={playAgain}>
                  Rejouer
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
