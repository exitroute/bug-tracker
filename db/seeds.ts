import db from "./index"
var faker = require("faker")

/*
 * This seed function is executed when you run `blitz db seed`.
 *
 * Probably you want to use a library like https://chancejs.com
 * or https://github.com/Marak/Faker.js to easily generate
 * realistic data.
 */

const seed = async () => {
  await db.issue.deleteMany()
  await db.user.deleteMany()

  await db.user.create({
    data: {
      name: "Ryan Admin",
      email: "dalryan.os@gmail.com",
      hashedPassword:
        "JGFyZ29uMmlkJHY9MTkkbT02NTUzNix0PTIscD0xJDZOYmpxRStHRnpjTDlmenU2b0xaZWckcEpuczkycGsyM2Q4bkQvS2lTYlAyTjNaWUQ1YnBjM3dmSDlCdlNadmlkdwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=",
      role: "ADMIN",
      createdIssues: {
        create: [
          {
            title: faker.hacker.phrase(),
            description: `${faker.hacker.noun} Does't Work`,
          },
        ],
      },
    },
  })

  await db.user.create({
    data: {
      name: "James User",
      email: "ryanoshea@t-mobile.de",
      hashedPassword:
        "JGFyZ29uMmlkJHY9MTkkbT02NTUzNix0PTIscD0xJDZOYmpxRStHRnpjTDlmenU2b0xaZWckcEpuczkycGsyM2Q4bkQvS2lTYlAyTjNaWUQ1YnBjM3dmSDlCdlNadmlkdwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=",
      role: "USER",
      createdIssues: {
        create: [
          {
            title: faker.hacker.phrase(),
            description: `${faker.hacker.noun} Does't Work`,
          },
        ],
      },
    },
  })

  for (let i = 0; i < 5; i++) {
    let name: string = faker.name.firstName()
    let email: string = faker.internet.exampleEmail(`${name}`)
    let description: string = faker.hacker.phrase()
    let title: string = `${faker.hacker.noun()} Does't Work`
    await db.user.create({
      data: {
        name: name,
        email: email,
        hashedPassword:
          "JGFyZ29uMmlkJHY9MTkkbT02NTUzNix0PTIscD0xJDZOYmpxRStHRnpjTDlmenU2b0xaZWckcEpuczkycGsyM2Q4bkQvS2lTYlAyTjNaWUQ1YnBjM3dmSDlCdlNadmlkdwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=",
        role: "USER",
        createdIssues: {
          create: [
            {
              title: title,
              description: description,
            },
            {
              title: title,
              description: description,
            },
            {
              title: title,
              description: description,
            },
            {
              title: title,
              description: description,
            },
            {
              title: title,
              description: description,
            },
          ],
        },
      },
    })
  }
}

export default seed
