To-Do List App 

Sovelluskuvaus ja tekninen dokumentaatio (https://phkk365-my.sharepoint.com/:w:/g/personal/jarno_vaisanen_edu_salpaus_fi/IQCE9usZ_1TFQKvONlSUTPPUATPoTbbjlvaL1IGHlvfsXPE?e=mClj5p)

Sovelluksen kuvaus 

To-Do List on selainpohjainen tehtävänhallintasovellus, jossa käyttäjä voi lisätä, poistaa ja järjestellä tehtäviä. Tehtävät tallentuvat MongoDB-tietokantaan, joten ne säilyvät sivun päivityksen jälkeenkin. Sovellus on suunniteltu yksinkertaiseksi ja nopeaksi käyttää. 

 

Käyttäjä voi: 

    Lisätä uusia tehtäviä tekstikentän kautta 

    Poistaa tehtäviä yksitellen 

    Siirtää tehtäviä ylös tai alas järjestyksen muuttamiseksi 

    Nähdä tehtävät tallennettuna myös sivun uudelleenlatauksen jälkeen 

Julkaisu 

Sovellus on julkaistu Vercel-alustalla ja saavutettavissa osoitteessa: 

https://vigilant-umbrella-h5qt.vercel.app 

Vercel rakentaa ja julkaisee sovelluksen automaattisesti aina kun muutoksia pushataan GitHub-repositorioon. Ympäristömuuttujat (kuten MongoDB-yhteysosoite) on asetettu Vercel-projektin asetuksissa. 

Käytetyt tekniikat 

Frontend 

    Next.js 16 — React-pohjainen full-stack framework 

    React 19 — käyttöliittymän komponenttikirjasto 

    Material UI (MUI) 6 — valmiit UI-komponentit ja teemoitus 

    Emotion — MUI:n CSS-in-JS tyylikirjasto 

Backend 

    Next.js App Router API Routes — palvelinpuolen REST-rajapinta 

    Mongoose 9 — MongoDB ODM (Object Document Mapper) 

    MongoDB Atlas — pilvipohjainen tietokanta 

Infrastruktuuri 

    Vercel — hosting ja automaattinen CI/CD 

    GitHub — versionhallinta 

    .env.local — ympäristömuuttujien hallinta 

API-kuvaus 

Sovelluksen REST API sijaitsee osoitteessa /api/tasks. Kaikki tietokantaoperaatiot kulkevat tämän reitin kautta — selain ei koskaan ota yhteyttä MongoDB:hen suoraan. 

 

Metodi 
	

Endpoint 
	

Toiminta 
	

Vastaus 

GET 
	

/api/tasks 
	

Hakee kaikki tehtävät tietokannasta aikajärjestyksessä 
	

JSON-taulukko tehtäväobjekteista 

POST 
	

/api/tasks 
	

Luo uuden tehtävän. Body: { text: string } 
	

Luotu tehtäväobjekti (status 201) 

DELETE 
	

/api/tasks 
	

Poistaa tehtävän ID:n perusteella. Body: { id: string } 
	

{ success: true } 

PATCH 
	

/api/tasks 
	

Vaihtaa kahden tehtävän järjestystä. Body: { id1, text1, id2, text2 } 
	

{ success: true } 

 

Virhetilanteissa API palauttaa HTTP-statuskoodin 400 tai 500 sekä JSON-objektin { error: string }. 

Tietomalli 

Tehtävä tallennetaan MongoDB:hen seuraavalla Mongoose-skeemalla: 

 

Kenttä 
	

Tyyppi 
	

Kuvaus 

_id 
	

ObjectId 
	

Automaattinen MongoDB-tunniste 

text 
	

String 
	

Tehtävän sisältö (pakollinen) 

createdAt 
	

Date 
	

Luontiaika (asetetaan automaattisesti) 
