// SEND TO ENV FILE
const baseURL = 'http://localhost:7007';

function calPercentage(a) {
  if (a.positive !== null && a.negative !== null) {
    var percentagem = (parseInt((a.positive), 10) * 100) / (parseInt((a.positive), 10) + parseInt((a.negative), 10))
  } else {
    var percentagem = 0
  }
  return percentagem;
}

async function getRanking() {
  try {
    const response = await fetch(`${baseURL}/fazenda.json`);

    if (response.status == 200) {
      const rankingJson = await response.json();
      const dataFilter = rankingJson.data.sort(function (a, b) {
        a.percentagem = calPercentage(a).toFixed(0)
        b.percentagem = calPercentage(b).toFixed(0)

        console.log(a)
        return calPercentage(b) - calPercentage(a)
      });

      document.querySelector('.leaderboard ol').innerHTML = dataFilter
        .map(
          ({ name, description, picture, percentagem }) =>
            `
          <li>

            <div class="photo">
              <div class="overflow-img">
                <img src="${picture}"  alt="Foto ${name}" />
              </div>
            </div>

            <div class="info">
              <p>${name}</p>
              <span>${description}</span>
            </div>
            <div class="statistics-box">
            ${percentagem != 0
              ? `
                <div class="positive" style="width:${percentagem - 20}%" >
                    <span> ${percentagem}%<span>
                </div>
                <div class="negative"  style="width:${(120 - percentagem)}%;">
                   <span> ${(100 - percentagem)}% </span>
                </div>`

              : `

              <div class="erro">
                  <span>Não Houve votos \n
                  <b> Ou impossivel consulta </b></span>
              </div>
              `
            }
            </div >
          </li >
          `,
        )
        .join('\n');

    } else {
      new Error('NÃO MEXE NESSE ARQUIVO AI NÃO!');
    }
  } catch (error) {
    new Error("Quem mexeu no arquivo ! '-' ");
  }
}

getRanking();
