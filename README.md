# TLD Observer

New top-level domains, right in your inbox.

[https://tld.observer](https://tld.observer/)

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

## About

TLD Observer allows you to subscribe to email notifications for new top-level domains. Users can choose to be notified
of newly-released TLDs, soon-to-be-released TLDs, or both.

![Screenshot](doc/screenshot.png)

**It comprises 4 main components:**

- 👷&nbsp; A cronjob-based worker process to detect new TLDs and save data about them
- 🚀&nbsp; A static website generator that will publish new website versions when new TLD data is saved
- 👩‍💻&nbsp; A public API allowing users to register to get email notifications
- 📬&nbsp; An email delivery service to send notifications based on both user and TLD data

## Tech stack

**⚙️&nbsp; Back-end built with:**

- [TypeScript](https://www.typescriptlang.org/)
- [Node](https://nodejs.org/)
- [Express](https://www.express.com/)
- [Massive](https://massivejs.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Heroku](https://heroku.com/)
- [Mailgun](https://www.mailgun.com/)

**💅&nbsp; Front-end built with:**

- [TypeScript](https://www.typescriptlang.org/)
- [React](https://reactjs.org/)
- [Styled-components](https://styled-components.com/)
- [Gatsby](https://www.gatsbyjs.org/)
- [GraphQL](https://graphql.org/)
- [Netlify](https://www.netlify.com/)

**🛠️&nbsp; Other tools:**

- [Cloudflare](https://www.cloudflare.com/)
- [Sumo Logic](https://www.sumologic.com/)
- [JWT](https://jwt.io/)
- [db-migrate](https://db-migrate.readthedocs.io/)
- [Jest](https://jestjs.io/)
- [Yup](https://github.com/jquense/yup)
- [Postman](https://www.postman.com/)
- [Adobe Illustrator](https://www.adobe.com/products/illustrator.html)
- [OmniGraffle](https://www.omnigroup.com/omnigraffle/)

## Architecture

![Architecture diagram](doc/architecture-diagram.png)

## Eye animation

<p align="center">
  <img src="doc/logo-animation.gif" width="511" alt="Logo">
</p>

The eye logo will move according to your cursor when you visit TLD Observer on a computer. Pretty cool right?

![Ellipse diagram](doc/ellipse-diagram.png)

In order to have a realistic pupil position no matter where your cursor is located, a math equation is repeatedly solved
as you move your cursor around: We find the intersection of the line that goes through both your cursor position and
the center of the eye and of an arbitrary ellipse defining the boundaries of the pupil. 🤓

## Reviews and awards

<div align="center">
  <img src="doc/lighthouse-score.png" width="480" alt="Lighthouse score"/>
  <p>“A masterpiece. 5 green circles.” - <em>Google Lighthouse</em></p>
  <p>&nbsp;</p>
</div>
<div align="center">
  <img src="doc/yslow-score.png" width="320" alt="YSlow score"/>
  <p>“LGTM 👍” - <em>YSlow</em></p>
  <p>&nbsp;</p>
</div>
<div align="center">
  <p>“Yep, it seems fine.” - <em>Dareboost</em></p>
  <p>&nbsp;</p>
</div>
<div align="center">
  <p>“Works well. Fonts look a little weird, but I'm used to it by now.” - <em>Internet Explorer</em></p>
  <p>&nbsp;</p>
</div>
<div align="center">
  <p>“Wow, it fits!” - <em>iPhone 5</em></p>
  <p>&nbsp;</p>
</div>

## Support and feedback

Shoot my an email at [tldobserver@pascalgiguere.dev](mailto:tldobserver@pascalgiguere.dev).
