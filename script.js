
    document.addEventListener('DOMContentLoaded', function() {
      var cipherText = document.getElementById('cipher-text');
      
      const characters = [..."CASARENO01@$#&"];
      const solveMilliseconds = 800;
      const characterSelectionMilliseconds = 40;
      const delayMilliseconds = 250;

      const randomArrayElement = (arr) => {
          return arr[(arr.length * Math.random()) | 0];
      };

      cipherText.addEventListener("mouseenter", (e) => {
          scrambleText(cipherText);
          e.preventDefault();
      });

      function scrambleText(element) {
          if (!element.classList.contains("active")) {
              let delay = 0;
              const elementText = element.innerText;
              const elementCharacters = [...elementText];
              const lockMilliseconds =
                  delayMilliseconds * elementCharacters.length + solveMilliseconds;

              element.classList.add("active");

              setTimeout(() => {
                  element.classList.remove("active");
              }, lockMilliseconds);

              elementCharacters.forEach((character, index) => {
                  setTimeout(
                      () => {
                          let intervalId = setInterval(() => {
                              const randomCharacter = randomArrayElement(characters);
                              element.innerText = replaceCharacter(
                                  element.innerText,
                                  index,
                                  randomCharacter
                              );

                              setTimeout(() => {
                                  clearInterval(intervalId);
                                  element.innerText = replaceCharacter(
                                      element.innerText,
                                      index,
                                      elementCharacters[index]
                                  );
                              }, solveMilliseconds);
                          }, characterSelectionMilliseconds);
                      },
                      delay === 0 ? (delay += 1) : (delay += delayMilliseconds)
                  );
              });
          }
      }

      function replaceCharacter(str, index, chr) {
          return `${str.substring(0, index)}${chr}${str.substring(index + 1)}`;
      }
    });
 