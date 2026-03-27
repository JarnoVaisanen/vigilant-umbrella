# To-Do List App

Selainpohjainen tehtävänhallintasovellus jossa tehtävät tallentuvat MongoDB-tietokantaan. Tehtävät säilyvät sivun päivityksen jälkeenkin.

**Julkaistu:** https://vigilant-umbrella-theta.vercel.app

---

## Ominaisuudet

- Lisää uusia tehtäviä tekstikentän kautta
- Poista tehtäviä yksitellen
- Siirrä tehtäviä ylös tai alas järjestyksen muuttamiseksi
- Tehtävät tallentuvat pysyvästi MongoDB-tietokantaan

---

## Käytetyt tekniikat

**Frontend**
- [Next.js 16](https://nextjs.org/) — React-pohjainen full-stack framework
- [React 19](https://react.dev/) — käyttöliittymän komponenttikirjasto
- [Material UI 6](https://mui.com/) — UI-komponentit ja teemoitus

**Backend**
- Next.js App Router API Routes — palvelinpuolen REST-rajapinta
- [Mongoose 9](https://mongoosejs.com/) — MongoDB ODM
- [MongoDB Atlas](https://www.mongodb.com/atlas) — pilvipohjainen tietokanta

**Infrastruktuuri**
- [Vercel](https://vercel.com/) — hosting ja automaattinen CI/CD
- GitHub — versionhallinta

---

## API

Kaikki tehtäväoperaatiot kulkevat `/api/tasks`-reitin kautta.

| Metodi | Endpoint | Toiminta |
|--------|----------|----------|
| `GET` | `/api/tasks` | Hakee kaikki tehtävät aikajärjestyksessä |
| `POST` | `/api/tasks` | Luo uuden tehtävän. Body: `{ text: string }` |
| `DELETE` | `/api/tasks` | Poistaa tehtävän. Body: `{ id: string }` |
| `PATCH` | `/api/tasks` | Vaihtaa kahden tehtävän järjestystä. Body: `{ id1, text1, id2, text2 }` |

---

## Tietomalli

```js
{
  _id:       ObjectId,  // automaattinen MongoDB-tunniste
  text:      String,    // tehtävän sisältö (pakollinen)
  createdAt: Date       // luontiaika (asetetaan automaattisesti)
}
```

---



## Projektin rakenne

```
├── app/
│   ├── layout.jsx        # Sovelluksen juurirakenne
│   ├── page.jsx          # Pääsivu (To-Do List UI)
│   ├── globals.css       # Globaalit tyylit
│   └── api/tasks/
│       └── route.js      # REST API
├── lib/
│   └── mongoose.js       # Tietokantayhteyden hallinta
├── models/
│   └── Task.js           # Mongoose-skeema
└── .env.local            # Ympäristömuuttujat (ei versionhallintaan)
```
