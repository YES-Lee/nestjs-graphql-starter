export default {
  a: [
    {
      id: 0,
      name: 'Jack'
    },
    {
      id: 1,
      name: 'David'
    }
  ],
  b: [
    {
      id: 0,
      name: 'China'
    },
    {
      id: 1,
      name: 'America'
    }
  ],
  ab: [
    {
      id: 0,
      a_id: 0,
      b_id: 0,
      note: `China's Jack`
    },
    {
      id: 1,
      a_id: 0,
      b_id: 1,
      note: `America's Jack`
    },
    {
      id: 2,
      a_id: 1,
      b_id: 0,
      note: `China's David`
    }
  ]
};
