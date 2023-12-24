const node = document.getElementsByClassName("searchInput")[0];
node.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    search(document.getElementById("toSearch").value);
  }
});

async function search(toSearch) {
  if ("" === toSearch || !toSearch)
    return alert(
      "Veuillez entrer un texte à rechercher dans les tomes de GDCP !"
    );

  document.getElementById("title1").style.display =
    document.getElementById("title2").style.display =
    document.getElementById("title3").style.display =
    document.getElementById("title4").style.display =
    document.getElementById("title5").style.display =
    document.getElementById("title6").style.display =
    document.getElementById("title7").style.display =
    document.getElementById("title8").style.display =
    document.getElementById("title9").style.display =
    document.getElementById("title10").style.display =
    document.getElementById("title11").style.display =
    document.getElementById("title12").style.display =
    document.getElementById("title13").style.display =
    document.getElementById("title14").style.display =
      "none";
  Array.from(document.getElementsByClassName("fancyline")).forEach(
    (f) => (f.style.display = "none")
  );
  document.getElementById("result1").innerHTML =
    document.getElementById("result2").innerHTML =
    document.getElementById("result3").innerHTML =
    document.getElementById("result4").innerHTML =
    document.getElementById("result5").innerHTML =
    document.getElementById("result6").innerHTML =
    document.getElementById("result7").innerHTML =
    document.getElementById("result8").innerHTML =
    document.getElementById("result9").innerHTML =
    document.getElementById("result10").innerHTML =
    document.getElementById("result11").innerHTML =
    document.getElementById("result12").innerHTML =
    document.getElementById("result13").innerHTML =
    document.getElementById("result14").innerHTML =
      "";
  document.getElementById("todelete").style.display = document.getElementById(
    "todelete2"
  ).style.display = "block";
  new Promise(async (resolve, reject) => {
    try {
      // Debut du chargement
      document.getElementById("loading").style.display = "block";
      const load = document.getElementById("searchBox");
      var dir = "top",
        c = true;
      var dist =
        load.getBoundingClientRect().top -
        document.getElementById("destination").getBoundingClientRect().top;
      dist *= -1;
      var computedStyle = window.getComputedStyle(load),
        pix = computedStyle.getPropertyValue(dir).replace("px", ""),
        final = Number(pix) + dist,
        a = dist / (1e3 / 10),
        i = setInterval(function () {
          (computedStyle = window.getComputedStyle(load)),
            (pix = computedStyle.getPropertyValue(dir).replace("px", ""));
          var t = Number(pix) + a;
          (!c && t >= final) || (c && t <= final)
            ? ((load.style[dir] = final + "px"), clearInterval(i))
            : (load.style[dir] = t + "px");
        }, 10);

      // Recherche dans les tomes
      new Promise(async (res, rej) => {
        for (var tomes = [], n = 1; n <= 15; n++)
          try {
            if (15 === n) {
              res(tomes);
              break;
            }
            function getTome(num) {
              return new Promise((rs, rj) => {
                try {
                  var n = new XMLHttpRequest(),
                    content = "vide";
                  (n.onreadystatechange = function () {
                    4 === this.readyState &&
                      200 === this.status &&
                      ((content = this.responseText), rs(content));
                  }),
                    n.open("GET", num, !0),
                    n.send();
                } catch (e) {
                  rj(e);
                }
              });
            }
            var tome = await getTome("./tomes/" + n + ".txt").catch(
              console.error
            );
            await tomes.push(tome);
          } catch (e) {
            rej(e);
          }
      })
        .then((t) => resolve(t))
        .catch(console.error);
    } catch (e) {
      // console.error(e);
      reject(e);
    }
  })
    .then((oldTomes) => {
      var reg1 = new RegExp(
          "(?:(?:.(?!\n\n))+.)?" +
            toSearch
              .trim()
              .replace(/[eéèëê]/g, "[eéèëê]")
              .replace(/[cç]/g, "[cç]")
              .replace(/[aâäáà]/g, "[aâäáà]")
              .replace(/[uüûúù]/g, "[uüûúù]")
              .replace(/[nñ]/g, "[nñ]") +
            "(?:(?:.(?!\n\n))+.)?"
        ),
        reg = new RegExp(reg1, "gi");
      new Promise((resolve, reject) => {
        try {
          var tomes = [];
          oldTomes.forEach((tome) => {
            var contents = tome.split("♣️");
            var Tome = new Object();
            var counter = 1;
            contents.forEach((content) => {
              var chap = "c" + String(content.match(/\d+/));
              if (content.includes("Prologue") || content.includes("Préface"))
                var chap = "b";
              if (content.includes("Remerciements")) var chap = "r";
              if (content.includes("TOME 9")) var chap = "a";
              if (oldTomes.indexOf(tome) === 12) {
                var chap = counter + content.match(/(?<=\n)[^\n]+/);
                counter++;
              }
              if (
                content.includes("TOME 10") ||
                content.includes("TOME 11") ||
                content.includes("TOME 12")
              )
                var chap = "f";
              Tome[chap] = content;
            });
            tomes.push(Tome);
          });

          var total = 0;
          tomes.forEach((tome) => {
            for (var ch in tome) {
              if (reg.test(tome[ch])) {
                document.getElementById("loading").style.display = "none";
                document.getElementById("todelete").style.display = "none";
                document.getElementById("todelete2").style.display = "none";
                switch (tomes.indexOf(tome)) {
                  case 0:
                    document.getElementById("title1").style.display = "block";
                    document.getElementById("results").innerHTML = document
                      .getElementById("results")
                      .innerHTML.replace(
                        'result1"></p>',
                        'result1"></p><br /><br /><hr class="fancyline" />'
                      );
                    break;
                  case 1:
                    document.getElementById("title2").style.display = "block";
                    document.getElementById("results").innerHTML = document
                      .getElementById("results")
                      .innerHTML.replace(
                        'result2"></p>',
                        'result2"></p><br /><br /><hr class="fancyline" />'
                      );
                    break;
                  case 2:
                    document.getElementById("title3").style.display = "block";
                    document.getElementById("results").innerHTML = document
                      .getElementById("results")
                      .innerHTML.replace(
                        'result3"></p>',
                        'result3"></p><br /><br /><hr class="fancyline" />'
                      );
                    break;
                  case 3:
                    document.getElementById("title4").style.display = "block";
                    document.getElementById("results").innerHTML = document
                      .getElementById("results")
                      .innerHTML.replace(
                        'result4"></p>',
                        'result4"></p><br /><br /><hr class="fancyline" />'
                      );
                    break;
                  case 4:
                    document.getElementById("title5").style.display = "block";
                    document.getElementById("results").innerHTML = document
                      .getElementById("results")
                      .innerHTML.replace(
                        'result5"></p>',
                        'result5"></p><br /><br /><hr class="fancyline" />'
                      );
                    break;
                  case 5:
                    document.getElementById("title6").style.display = "block";
                    document.getElementById("results").innerHTML = document
                      .getElementById("results")
                      .innerHTML.replace(
                        'result6"></p>',
                        'result6"></p><br /><br /><hr class="fancyline" />'
                      );
                    break;
                  case 6:
                    document.getElementById("title7").style.display = "block";
                    document.getElementById("results").innerHTML = document
                      .getElementById("results")
                      .innerHTML.replace(
                        'result7"></p>',
                        'result7"></p><br /><br /><hr class="fancyline" />'
                      );
                    break;
                  case 7:
                    document.getElementById("title8").style.display = "block";
                    document.getElementById("results").innerHTML = document
                      .getElementById("results")
                      .innerHTML.replace(
                        'result8"></p>',
                        'result8"></p><br /><br /><hr class="fancyline" />'
                      );
                    break;
                  case 8:
                    document.getElementById("title9").style.display = "block";
                    document.getElementById("results").innerHTML = document
                      .getElementById("results")
                      .innerHTML.replace(
                        'result9"></p>',
                        'result9"></p><br /><br /><hr class="fancyline" />'
                      );
                    break;
                  case 9:
                    document.getElementById("title10").style.display = "block";
                    document.getElementById("results").innerHTML = document
                      .getElementById("results")
                      .innerHTML.replace(
                        'result10"></p>',
                        'result10"></p><br /><br /><hr class="fancyline" />'
                      );
                    break;
                  case 10:
                    document.getElementById("title11").style.display = "block";
                    document.getElementById("results").innerHTML = document
                      .getElementById("results")
                      .innerHTML.replace(
                        'result11"></p>',
                        'result11"></p><br /><br /><hr class="fancyline" />'
                      );
                    break;
                  case 11:
                    document.getElementById("title12").style.display = "block";
                    document.getElementById("results").innerHTML = document
                      .getElementById("results")
                      .innerHTML.replace(
                        'result12"></p>',
                        'result12"></p><br /><br /><hr class="fancyline" />'
                      );
                    break;
                  case 12:
                    document.getElementById("title13").style.display = "block";
                    document.getElementById("results").innerHTML = document
                      .getElementById("results")
                      .innerHTML.replace(
                        'result13"></p>',
                        'result13"></p><br /><br /><hr class="fancyline" />'
                      );
                    break;
                  case 13:
                    document.getElementById("title14").style.display = "block";
                    document.getElementById("results").innerHTML = document
                      .getElementById("results")
                      .innerHTML.replace(
                        'result14"></p>',
                        'result14"></p><br /><br /><hr class="fancyline" />'
                      );
                    break;
                  default:
                    total++;
                }
                var chapitre = undefined;
                if (ch === "a") chapitre = "Bonus";
                if (ch === "b") chapitre = "Prologue";
                if (String(ch).length > 3) {
                  chapitre = ch.replace(/\d/, "");
                }
                if (ch.match(/\d+/) && chapitre === undefined)
                  chapitre = "Chapitre " + ch.match(/\d+/);
                if (ch === "r") chapitre = "Remerciements";
                if (ch === "f") chapitre = "Nouvelle bonus";
                var matched = tome[ch].match(reg);
                console.log(tomes.indexOf(tome) + 1);
                if (tomes.indexOf(tome) + 1 === 11) {
                  document.getElementById("result11").innerHTML += matched
                    .map(
                      (m) =>
                        "<p><b><u>" +
                        chapitre.replace(/chapitre/i, "Jour") +
                        " :</b></u> " +
                        m
                          .replace(
                            new RegExp("(" + toSearch + ")", "gi"),
                            "<b>$1</b>"
                          )
                          .trim() +
                        "</p>"
                    )
                    .join("\n");
                } else if (tomes.indexOf(tome) + 1 === 13) {
                  document.getElementById("result13").innerHTML += matched
                    .map(
                      (m) =>
                        "<p><b><u>" +
                        chapitre +
                        " :</b></u> " +
                        m
                          .replace(
                            new RegExp("(" + toSearch + ")", "gi"),
                            "<b>$1</b>"
                          )
                          .trim() +
                        "</p>"
                    )
                    .join("\n");
                } else {
                  document.getElementById(
                    "result" + (tomes.indexOf(tome) + 1)
                  ).innerHTML += matched
                    .map(
                      (m) =>
                        "<p><b><u>" +
                        chapitre +
                        " :</b></u> " +
                        m
                          .replace(
                            new RegExp("(" + toSearch + ")", "gi"),
                            "<b>$1</b>"
                          )
                          .trim() +
                        "</p>"
                    )
                    .join("\n");
                }
                resolve("success");
              }
            }
            if (total === 13) {
              document.getElementById("loading").style.display = "none";
              alert("Aucun résultat trouvé");
              throw "Aucun résultat trouvé";
            }
          });
        } catch (e) {
          console.error(e);
          reject(e);
        }
      })
        .then(() => {
          Array.from(document.getElementsByTagName("p")).forEach((p) => {
            if (p.parentNode.lastElementChild.innerHTML !== p.innerHTML)
              p.innerHTML += "<br><hr><br>";
          });
        })
        .catch(console.error);
    })
    .catch(console.error);
}
