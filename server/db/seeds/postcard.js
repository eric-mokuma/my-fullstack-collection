/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('postcard').del()
  await knex('postcard').insert([
    {
      id: 1,
      from: 'karl',
      phone: '123456789',
      material: 'paper',
      date: '20-june-2000',
    },
    {
      id: 2,
      from: 'thomas',
      phone: '123489876',
      material: 'plastic',
      date: '20-july-2020',
    },
    {
      id: 3,
      from: 'wookie',
      phone: '123980333',
      material: 'paperplastic',
      date: '20-may-2022',
    },
  ])
}
