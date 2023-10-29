<template>
  <div>
    <div v-for="rich in riches.data" :key="rich.id">
      <Hero
        :title="rich.attributes.title"
        :description="rich.attributes.description"
      />

      <Grid :sections="rich.attributes.section" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'RichPage',
  async asyncData($route) {
    const riches = await fetch(
      `${process.env.strapiEndpoint}/api/riches?filters[slug][$eq]=${$route.params.slug}&populate=section,section.image`
    ).then((res) => res.json())

    return {
      riches,
    }
  },
}
</script>
