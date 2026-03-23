import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function getFeedback(topic: string, userOutline: string) {
  const model = "gemini-3.1-pro-preview";
  const prompt = `
    Euskara B2 mailako ahozko azterketarako prestatzailea zara. 
    Erabiltzaileak gai bati buruzko gidoi edo azalpen bat eman dizu.
    
    Gaia: ${topic}
    Erabiltzailearen testua: ${userOutline}
    
    Mesedez, eman feedbacka hurrengo puntuetan:
    1. Edukia: Gaia ondo jorratu den eta ideiak koherenteak diren.
    2. Hiztegia: B2 mailako hitzak eta esamoldeak erabili diren.
    3. Gramatika: Akats nabarmenak eta hobetzeko puntuak.
    4. Lokailuak: Testuaren lotura hobetzeko iradokizunak.
    
    Erantzun euskaraz, modu positiboan eta eraikitzailean. Erabili Markdown formatua.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error getting feedback:", error);
    return "Barkatu, ezin izan dut feedbacka lortu une honetan.";
  }
}

export async function getModelAnswer(topic: string) {
  const model = "gemini-3.1-pro-preview";
  const prompt = `
    Euskara B2 mailako ahozko azterketarako prestatzailea zara. 
    Gaia: ${topic}
    
    Mesedez, idatzi "Ereduzko Erantzun" (Model Answer) bat gai honi buruz.
    Erantzunak hurrengo egitura izan behar du:
    1. Sarrera laburra (agurra eta gaiaren aurkezpena).
    2. Garapena (2-3 puntu nagusi, lokailu egokiak erabiliz).
    3. Ondorioa (laburpena eta agurra).
    
    Erabili B2 mailako hiztegi aberatsa eta egitura gramatikal egokiak.
    Erantzun euskaraz eta erabili Markdown formatua.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error getting model answer:", error);
    return "Barkatu, ezin izan dut ereduizko erantzuna lortu une honetan.";
  }
}

export async function analyzeAudio(topic: string, audioBase64: string, mimeType: string) {
  const model = "gemini-3.1-pro-preview";
  const prompt = `
    Euskara B2 mailako ahozko azterketarako prestatzailea zara. 
    Erabiltzaileak gai honi buruzko audio bat grabatu du: "${topic}".
    
    Mesedez, entzun audioa eta eman feedback zehatza hurrengo puntuetan:
    1. Transkripzioa: Audioaren laburpen edo transkripzio partziala (akatsak ikusteko).
    2. Fluidentasuna: Ea geldialdi gehiegi egiten dituen edo modu naturalean hitz egiten duen.
    3. Ahoskera: Hobetu beharreko soinuak edo hitzak.
    4. Gramatika eta Hiztegia: B2 mailako maila erakusten duen.
    
    AZKENEAN, gehitu JSON objektu bat (soilik JSONa, beste ezer gabe) puntuazio hauekin (0-100):
    {
      "fluency": number,
      "vocabulary": number,
      "grammar": number,
      "pronunciation": number
    }
    
    Erantzun euskaraz Markdown formatuan.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: [
        { text: prompt },
        {
          inlineData: {
            mimeType,
            data: audioBase64,
          },
        },
      ],
    });
    return response.text;
  } catch (error) {
    console.error("Error analyzing audio:", error);
    return "Barkatu, ezin izan dut audioa aztertu une honetan.";
  }
}

export async function getB2Synonyms(word: string) {
  const model = "gemini-3.1-pro-preview";
  const prompt = `
    Euskara B2 mailako prestatzailea zara. 
    Erabiltzaileak hitz arrunt bat eman dizu: "${word}".
    
    Mesedez, eman 3-5 sinonimo edo esamolde aberatsagoak (B2 mailakoak) hitz hori ordezkatzeko.
    Eman adibide labur bat bakoitzarentzat.
    Erantzun euskaraz Markdown formatuan.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error getting synonyms:", error);
    return "Barkatu, ezin izan dut sinonimorik aurkitu.";
  }
}

export async function getInterviewQuestion(topic: string, previousSpeechSummary: string) {
  const model = "gemini-3.1-pro-preview";
  const prompt = `
    Euskara B2 mailako aztertzailea zara. 
    Erabiltzaileak "${topic}" gaiari buruzko azalpena eman du.
    Hona hemen bere azalpenaren laburpena: ${previousSpeechSummary}
    
    Mesedez, egin iezaiozu galdera bat (interakzio fasea simulatzeko). 
    Galderak lotura izan behar du esandakoarekin eta B2 mailako erantzun bat eskatzen duena (iritzia, hipotesia, esperientzia pertsonala...).
    
    Erantzun soilik galderarekin, euskaraz.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error getting interview question:", error);
    return "Zer iruditzen zaizu gai honen inguruan orokorrean?";
  }
}
