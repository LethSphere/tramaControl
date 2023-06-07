import React, { useState } from "react";

function App() {
  const [ack, setAck] = useState(false);
  const [enq, setEnq] = useState(false);
  const [ctr, setCtr] = useState(false);
  const [dat, setDat] = useState(false);
  const [ppt, setPpt] = useState(false);
  const [lpr, setLpr] = useState(false);
  const [seq, setSeq] = useState(0);
  const [ack1, setAck1] = useState(false);
  const [enq1, setEnq1] = useState(false);
  const [ctr1, setCtr1] = useState(false);
  const [dat1, setDat1] = useState(false);
  const [ppt1, setPpt1] = useState(false);
  const [lpr1, setLpr1] = useState(false);
  const [seq1, setSeq1] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [numTramas, setNumTramas] = useState(1);
  const [tramasCargadas, setTramasCargadas] = useState(false);
  const [text, setText] = useState("");
  const [grupos, setGrupos] = useState([]);
  const [posicion, setPosicion] = useState(0);
  const [semantica, setSemantica] = useState("");
  const [semanticaR, setSemanticaR] = useState("");
  const [trama, setTrama] = useState("");
  const [tramaR, setTramaR] = useState("");
  const [Indicador, setIndicador] = useState("1000001");

  const handleTrama = (pos) => {
    setTrama(grupos[pos]);
  };

  const handleSendButton = () => {
    // Aquí puedes escribir la lógica para enviar los datos con las reglas y campos adicionales
    console.log("ACK:", ack ? 1 : 0);
    console.log("ENQ:", enq ? 1 : 0);
    console.log("CTR:", ctr ? 1 : 0);
    console.log("DAT:", dat ? 1 : 0);
    console.log("PPT:", ppt ? 1 : 0);
    console.log("LPR:", lpr ? 1 : 0);
    console.log("SEQ:", seq ? 1 : 0);
    console.log("Mensaje:", mensaje);
    console.log("Número de Tramas:", numTramas);
    console.log("Reglas:", getReglas());
    const numeroBinario = getReglas();
    if (numeroBinario === "001010") {
      console.log("Resultado 1");
      setTrama("");
      setText((text) => text + "Tx\n");
      setText((text) => text + "Control, permiso para transmitir\n");
      setSemantica("Trama de control, permiso para transmitir");
    } else if (numeroBinario === "000100"&& posicion + 1 != grupos.length && posicion + 1 < grupos.length) {
      console.log("Resultado 3");
      handleTrama(posicion);
      setText((text) => text + "Tx\n");
      setText((text) => text + "Datos\n");
      setSemantica("Trama de datos");
    } else if (numeroBinario === "010100" && posicion + 1 == grupos.length) {
      console.log("Resultado 4");
      handleTrama(posicion);
      setText((text) => text + "Tx\n");
      setSemantica("Ultima trama de datos");
      setText((text) => text + "Control,final datos\n");
    } else {
      setSemantica("Opción inválida");
      console.log("Opción inválida");
    }
    setTramasCargadas(true);
  };

  const handleResButton = () => {
    // Aquí puedes escribir la lógica para enviar los datos con las reglas y campos adicionales
    console.log("ACK:", ack ? 1 : 0);
    console.log("ENQ:", enq ? 1 : 0);
    console.log("CTR:", ctr ? 1 : 0);
    console.log("DAT:", dat ? 1 : 0);
    console.log("PPT:", ppt ? 1 : 0);
    console.log("LPR:", lpr ? 1 : 0);
    console.log("SEQ:", seq1 ? 1 : 0);
    console.log("Mensaje:", mensaje);
    console.log("Número de Tramas:", numTramas);
    console.log("Reglas:", getReglasR());
    const numeroBinario = getReglasR();
    if (numeroBinario === "001001") {
      console.log("Resultado 2");
      setText((text) => text + "Rx\n");
      setSemanticaR("Trama de control, listo para recibir");
      setText((text) => text + "Control, listo para recibir\n");
    } else if (numeroBinario === "101000"&& posicion + 1 != grupos.length && posicion + 1 < grupos.length) {
      console.log("Resultado 4");
      handleGrupos();
      setPosicion((posicion) => posicion + 1);
      setText((text) => text + "Rx\n");
      setText((text) => text + "Control, datos\n");
      setSemanticaR("Trama de control, frame recibido correctamente");
    } else if (numeroBinario === "111000" && posicion + 1 == grupos.length) {
      console.log("Resultado 6");
      handleGrupos();
      setPosicion((posicion) => posicion + 1);
      setText((text) => text + "Rx\n");
      setText((text) => text + "Control,final datos\n");
      setSemanticaR("Trama de control, ultimo frame recibido correctamente");
    } else {
      setSemanticaR("Opción inválida");
      console.log("Opción inválida");
    }
  };

  const handleGrupos = () => {
    setTramaR(grupos.slice(0, posicion + 1).join(""));
  };

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const getReglas = () => {
    const checkboxes = [ack, enq, ctr, dat, ppt, lpr];
    return checkboxes.map((checkbox) => (checkbox ? 1 : 0)).join("");
  };
  const getReglasR = () => {
    const checkboxes = [ack1, enq1, ctr1, dat1, ppt1, lpr1];
    return checkboxes.map((checkbox) => (checkbox ? 1 : 0)).join("");
  };

  //dividir en tramas por caracter

  const handleMensajeChange = (e) => {
    setMensaje(e.target.value);
  };

  const handleNumTramasChange = (e) => {
    setNumTramas(parseInt(e.target.value));
  };

  const dividirMensajeEnGrupos = () => {
    const regex = new RegExp(`.{1,${numTramas}}`, "g");
    const gruposDivididos = mensaje.match(regex) || [];
    setGrupos(gruposDivididos);
  };

  return (
    <div class="grid grid-cols-3 gap-6">
      <div class="col-span-2">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold mb-4">Transmisor</h1>
          <h2 className="text-lg font-bold mb-2">Mensaje a transmitir</h2>
          <div className="mb-4">
            <div className="flex">
              <div className="w-1/2 mr-2">
                <label htmlFor="campo1">Mensaje a transmitir:</label>
                <input
                  type="text"
                  value={mensaje}
                  onChange={handleMensajeChange}
                  className="border rounded px-2 py-1"
                />
              </div>
              <div className="w-1/2 ml-2">
                <label htmlFor="campo2">Número de tramas:</label>
                <input
                  type="number"
                  value={numTramas}
                  onChange={handleNumTramasChange}
                  className="border rounded px-2 py-1"
                />
              </div>
            </div>
            {/*
            <div className="mb-2">
              <label className="mr-2">Tramas:</label>
              <ul>
                {grupos.map((grupo, index) => (
                  <li key={index}>{grupo}</li>
                ))}
              </ul>
            </div>
                */}
          </div>
          <div className="mb-4">
            <button
              onClick={dividirMensajeEnGrupos}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Cargar Tramas
            </button>
          </div>
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Indicador
                </th>
                <th className="px-3 py-3 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ACK
                </th>
                <th className="px-3 py-3 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ENQ
                </th>
                <th className="px-3 py-3 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  CTR
                </th>
                <th className="px-3 py-3 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  DAT
                </th>
                <th className="px-3 py-3 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  PPT
                </th>
                <th className="px-3 py-3 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  LPR
                </th>
                <th className="px-3 py-3 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  NUM
                </th>
                <th className="px-3 py-3 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Indicador
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 center whitespace-nowrap">
                  <input
                    type="text"
                    value={Indicador}
                    readOnly
                    className="border rounded px-2 py-1 w-20"
                  />
                </td>
                <td className="px-3 py-4 whitespace-nowrap">
                  <div className="flex justify-center text-sm text-gray-900">
                    <input
                      type="checkbox"
                      checked={ack}
                      onChange={() => setAck(!ack)}
                    />
                  </div>
                </td>
                <td className="px-3 py-4 whitespace-nowrap">
                  <div className="flex justify-center text-sm text-gray-900">
                    <input
                      type="checkbox"
                      checked={enq}
                      onChange={() => setEnq(!enq)}
                    />
                  </div>
                </td>
                <td className="px-3 py-4 whitespace-nowrap">
                  <div className="flex justify-center text-sm text-gray-900">
                    <input
                      type="checkbox"
                      checked={ctr}
                      onChange={() => setCtr(!ctr)}
                    />
                  </div>
                </td>
                <td className="px-3 py-4 whitespace-nowrap">
                  <div className="flex justify-center text-sm text-gray-900">
                    <input
                      type="checkbox"
                      checked={dat}
                      onChange={() => setDat(!dat)}
                    />
                  </div>
                </td>
                <td className="px-3 py-4 whitespace-nowrap">
                  <div className="flex justify-center text-sm text-gray-900">
                    <input
                      type="checkbox"
                      checked={ppt}
                      onChange={() => setPpt(!ppt)}
                    />
                  </div>
                </td>
                <td className="px-3 py-4 whitespace-nowrap">
                  <div className="flex justify-center text-sm text-gray-900">
                    <input
                      type="checkbox"
                      checked={lpr}
                      onChange={() => setLpr(!lpr)}
                    />
                  </div>
                </td>
                <td className="px-3 py-4 whitespace-nowrap">
                  <div className="flex justify-center text-sm text-gray-900">
                    <input
                      type="text"
                      value={[posicion + 1]}
                      readOnly
                      className="border rounded px-2 py-1 w-10"
                    />
                  </div>
                </td>
                <td className="px-6 py-4 center whitespace-nowrap">
                  <input
                    type="text"
                    value={Indicador}
                    readOnly
                    className="border rounded px-2 py-1 w-20"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          {grupos.length > 0 && posicion < grupos.length && (
            <div className="mb-4">
              <label className="mr-2">Información:</label>
              <input
                type="text"
                value={grupos[posicion]}
                readOnly
                className="border rounded px-2 py-1"
              />
            </div>
          )}
          {/*
          <div className="mb-4">
            <label className="mr-2">Reglas:</label>
            <input
              type="text"
              value={getReglas()}
              readOnly
              className="border rounded px-2 py-1"
            />
          </div>
          */}
          <div className="mb-4">
            <div>
              <button
                onClick={handleSendButton}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Enviar
              </button>
            </div>
          </div>
          <div className="mb-4">
            <label className="mr-2">Semántica:</label>
            <input
              type="text"
              value={semantica}
              readOnly
              className="border rounded px-2 py-1"
            />
          </div>
          <h1 className="text-2xl font-bold mb-4">Receptor</h1>
          <h2 className="text-lg font-bold mb-2">Trama recibida</h2>
          {tramasCargadas && (
            <div className="mb-4">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Header
                    </th>
                    <th className="px-3 py-3 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                    <th className="px-3 py-3 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Informacion
                    </th>
                    <th className="px-3 py-3 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Indicador
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 center whitespace-nowrap">
                      <input
                        type="text"
                        value={Indicador}
                        readOnly
                        className="border rounded px-2 py-1 w-20"
                      />
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap">
                      <div className="flex justify-center text-sm text-gray-900">
                        <input
                          type="text"
                          value={getReglas() + [posicion + 1]}
                          readOnly
                          className="border rounded px-2 py-1 w-20"
                        />
                      </div>
                    </td>

                    <td className="px-3 py-4 whitespace-nowrap">
                      {grupos.length > 0 && posicion < grupos.length && (
                        <div className="mb-2">
                          <input
                            type="text"
                            value={trama}
                            readOnly
                            className="border rounded px-2 py-1 w-20"
                          />
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 center whitespace-nowrap">
                      <input
                        type="text"
                        value={Indicador}
                        readOnly
                        className="border rounded px-2 py-1 w-20"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
          <h2 className="text-lg font-bold mb-2">Respuesta</h2>
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Indicador
                </th>
                <th className="px-3 py-3 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ACK
                </th>
                <th className="px-3 py-3 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ENQ
                </th>
                <th className="px-3 py-3 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  CTR
                </th>
                <th className="px-3 py-3 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  DAT
                </th>
                <th className="px-3 py-3 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  PPT
                </th>
                <th className="px-3 py-3 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  LPR
                </th>
                <th className="px-3 py-3 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  NUM
                </th>
                <th className="px-3 py-3 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Indicador
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 center whitespace-nowrap">
                  <input
                    type="text"
                    value={Indicador}
                    readOnly
                    className="border rounded px-2 py-1 w-20"
                  />
                </td>
                <td className="px-3 py-4 whitespace-nowrap">
                  <div className="flex justify-center text-sm text-gray-900">
                    <input
                      type="checkbox"
                      checked={ack1}
                      onChange={() => setAck1(!ack1)}
                    />
                  </div>
                </td>
                <td className="px-3 py-4 whitespace-nowrap">
                  <div className="flex justify-center text-sm text-gray-900">
                    <input
                      type="checkbox"
                      checked={enq1}
                      onChange={() => setEnq1(!enq1)}
                    />
                  </div>
                </td>
                <td className="px-3 py-4 whitespace-nowrap">
                  <div className="flex justify-center text-sm text-gray-900">
                    <input
                      type="checkbox"
                      checked={ctr1}
                      onChange={() => setCtr1(!ctr1)}
                    />
                  </div>
                </td>
                <td className="px-3 py-4 whitespace-nowrap">
                  <div className="flex justify-center text-sm text-gray-900">
                    <input
                      type="checkbox"
                      checked={dat1}
                      onChange={() => setDat1(!dat1)}
                    />
                  </div>
                </td>
                <td className="px-3 py-4 whitespace-nowrap">
                  <div className="flex justify-center text-sm text-gray-900">
                    <input
                      type="checkbox"
                      checked={ppt1}
                      onChange={() => setPpt1(!ppt1)}
                    />
                  </div>
                </td>
                <td className="px-3 py-4 whitespace-nowrap">
                  <div className="flex justify-center text-sm text-gray-900">
                    <input
                      type="checkbox"
                      checked={lpr1}
                      onChange={() => setLpr1(!lpr1)}
                    />
                  </div>
                </td>
                <td className="px-3 py-4 whitespace-nowrap">
                  <div className="flex justify-center text-sm text-gray-900">
                    <input
                      type="text"
                      value={[posicion + 1]}
                      readOnly
                      className="border rounded px-2 py-1 w-10"
                    />
                  </div>
                </td>
                <td className="px-6 py-4 center whitespace-nowrap">
                  <input
                    type="text"
                    value={Indicador}
                    readOnly
                    className="border rounded px-2 py-1 w-20"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div className="mb-4">
            <label className="mr-2">Información:</label>
            <input
              type="text"
              value={trama}
              readOnly
              className="border rounded px-2 py-1"
            />
          </div>
          <div className="mb-4">
            <button
              onClick={handleResButton}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Responder
            </button>
          </div>
          <div className="mb-4">
            <label className="mr-2">Semántica:</label>
            <input
              type="text"
              value={semanticaR}
              readOnly
              className="border rounded px-2 py-1"
            />
          </div>
          <div className="mb-4">
            <label>Mensaje recibido:</label>
            <input
              type="text"
              value={tramaR}
              readOnly
              className="border rounded px-2 py-1"
            />
          </div>
        </div>
      </div>
      <div>
        <h1 className="text-2xl font-bold mb-4">Secuencia de tramas</h1>
        <div>
          <textarea
            value={text}
            onChange={handleChange}
            rows={40}
            cols={30}
            readOnly
          />
        </div>
      </div>
    </div>
  );
}

export default App;
