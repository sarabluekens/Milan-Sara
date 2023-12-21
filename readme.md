# Clone repo
Clone this repo on you device

# Env files
packages/api
.env


# How to seed

- First seed the birds, because observations needs the birds to work

```bash
npx nestjs-command seed:database:caregivers
npx nestjs-command seed:database:equipments
...
```

- Reset all

```bash
npx nestjs-command seed:reset

```

- Reset specific

```bash
npx nestjs-command seed:reset:birds
```

------
Open the project and run ....
