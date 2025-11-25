<template>
  <div>
    <StatsCards />
    <Charts />

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <RecentOrders class="lg:col-span-2" />
      <RecentActivity />
    </div>
    <StackedBarChart class="mt-6" />
  </div>
</template>

<script setup>
import StatsCards from "../components/StatsCards.vue";
import Charts from "../components/Charts.vue";
import RecentOrders from "../components/RecentOrders.vue";
import RecentActivity from "../components/RecentActivity.vue";
import StackedBarChart from "../components/StackedBarChart.vue";
</script>
