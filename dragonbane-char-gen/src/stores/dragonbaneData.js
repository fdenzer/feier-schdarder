import { defineStore } from 'pinia'

// Import all the JSON data files
import attributesData from '../data/attributes.json'
import gearData from '../data/gear.json'
import heroicAbilitiesData from '../data/heroic_abilities.json'
import kinData from '../data/kin.json'
import mementosData from '../data/mementos.json'
import professionsData from '../data/professions.json'
import skillsData from '../data/skills.json'
import spellsData from '../data/spells.json'
import weaknessesData from '../data/weaknesses.json'

export const useDragonbaneDataStore = defineStore('dragonbaneData', {
  state: () => ({
    attributes: attributesData,
    gear: gearData,
    heroicAbilities: heroicAbilitiesData,
    kin: kinData,
    mementos: mementosData,
    professions: professionsData,
    skills: skillsData,
    spells: spellsData,
    weaknesses: weaknessesData,
    // You can add more state properties or getters/actions as needed
  }),
  // Optional getters
  getters: {
    // Example getter: get all kin names
    allKinNames: (state) => state.kin.map(k => k.name),
    // Example getter: get a specific skill by name
    getSkillByName: (state) => (skillName) => {
      const coreSkill = state.skills.core_skills.find(s => s.name === skillName);
      if (coreSkill) return coreSkill;
      const weaponSkill = state.skills.weapon_skills.find(s => s.name === skillName);
      if (weaponSkill) return weaponSkill;
      const secondarySkill = state.skills.secondary_skills.find(s => s.name === skillName);
      return secondarySkill || null;
    }
  },
  // Optional actions
  actions: {
    // Example action:
    // async fetchMoreData() {
    //   // const response = await fetch('api/more-data')
    //   // this.someOtherData = await response.json()
    // }
  }
})
