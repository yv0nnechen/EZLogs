<script>
export default {
  shapes: [
    {
      id: 'slab',
      title: 'Slab / Wall',
      icon: 'mdi-cube-outline',
      props: ['depth', 'length', 'width'],
    },
    {
      id: 'cylinder',
      title: 'Round Column',
      icon: 'mdi-pillar',
      props: ['height', 'diameter'],
    },
  ],
  units: ['m', 'cm', 'mm'],
};

</script>
