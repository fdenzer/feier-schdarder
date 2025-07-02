<script setup>
import { ref, computed } from 'vue';

// Core Attributes
const attributes = ref({
  STR: 10,
  CON: 10,
  AGL: 10,
  INT: 10,
  WIL: 10,
  CHA: 10,
});

const attributeMin = 3;
const attributeMax = 18;

function validateAttribute(attr) {
  if (attributes.value[attr] < attributeMin) attributes.value[attr] = attributeMin;
  if (attributes.value[attr] > attributeMax) attributes.value[attr] = attributeMax;
}

// Kin
const kinList = ref([
  {
    name: 'Human',
    abilityName: 'Adaptive',
    abilityDescription: 'When rolling for a skill, you can choose to make the roll using another skill of your choice. You must be able to justify how you use the selected skill instead of the normal one. The GM has the final word, but should be lenient. (Cost: 3 WP, as per Archmaster Aodhan pre-gen, though PDF p5 says innate abilities cost WP in most cases - this might vary)'
  },
  {
    name: 'Halfling',
    abilityName: 'Hard to Catch',
    abilityDescription: 'You can activate this ability when dodging an attack, getting a boon to the EVADE roll. (Cost: 3 WP, as per Krisanna pre-gen)'
  },
  {
    name: 'Dwarf',
    abilityName: 'Robust (Example - Not in Quickstart PDF)',
    abilityDescription: 'Dwarves are known for their hardiness. Gain +1 HP per level or a similar benefit. (Details needed from full rules)'
  }, // Placeholder, Dwarf not in pre-gens
  {
    name: 'Elf',
    abilityName: 'Inner Peace',
    abilityDescription: 'As an elf, you can meditate deeply during a stretch rest. You heal an additional D6 HP and a D6 extra WP, and can recover from an additional condition. You are completely unresponsive during your meditation and cannot be awakened. (Cost: Free, as per Orla pre-gen)'
  },
  {
    name: 'Mallard',
    abilityName: 'Ill-tempered & Webbed Feet',
    abilityDescription: 'Ill-tempered: Activate when making a skill roll (not INT-based) to get a boon; become Angry. (Cost: 3 WP). Webbed Feet: Boon to SWIMMING rolls, full speed in water. (Cost: Free). (As per Makander pre-gen)'
  },
  {
    name: 'Wolfkin',
    abilityName: 'Hunting Instincts',
    abilityDescription: 'Designate a creature in sight/scent as prey (action). Follow scent for a day. Spend 1 WP for a boon on attack against prey. (Cost: 3 WP to designate, as per Bastonn pre-gen)'
  },
]);
const selectedKin = ref(kinList.value[0]);

// Derived Ratings
const hitPoints = computed(() => attributes.value.CON);
const willpowerPoints = computed(() => attributes.value.WIL);

// Movement: Quickstart p.5 "Movement: This rating determines how many meters you can run in a round of combat (page 11)."
// Page 12 (Movement section) "Under normal circumstances, you can move as many meters as your Movement rate."
// Pre-gens show varying movement rates (e.g., Aodhan 8, Orla 14, Makander 8, Krisanna 12, Bastonn 14).
// This suggests it's not a simple calculation from a single attribute at character creation, or is Kin/Profession based.
// For now, let's use a base and allow input, as it's not directly calculable from STR/AGL etc. during base creation from the PDF.
const movement = ref(10); // Default, user can adjust

// Damage Bonus: Quickstart p.5 "You have two separate damage bonuses – one for STR-based weapons and one for AGL-based weapons."
// The pre-gens show damage bonuses like D4, D6, or — (none). This implies a table or step-based system rather than a direct formula like (Attr-10)/2.
// Example: Bastonn (STR 18) has D6 STR bonus. Makander (STR 16) has D4. Aodhan (STR 8) has none.
// This suggests a lookup based on STR/AGL score.
// STR 18 -> D6, STR 16 -> D4, STR 13 -> D4 (Orla), STR 8 -> 0
// AGL 18 -> D6 (Krisanna), AGL 17 -> D6 (Orla), AGL 14 -> D4 (Bastonn), AGL 9 -> 0 (Aodhan)
// Tentative scale based on pre-gens:
// <=9: 0
// 10-13: D4 (though Orla STR 13 has D4, Aodhan AGL 9 has none - maybe 11-13 is D4?)
// Orla (AGL 17, D6 DB) vs Krisanna (AGL 18, D6 DB)
// Bastonn (STR 18, D6 DB) vs Makander (STR 16, D4 DB)
// Let's try: <=9: None; 10-15: D4; 16+: D6. This is an approximation.
const damageBonusSTR = computed(() => {
  if (attributes.value.STR >= 16) return 'D6';
  if (attributes.value.STR >= 10) return 'D4';
  return '—';
});
const damageBonusAGL = computed(() => {
  if (attributes.value.AGL >= 16) return 'D6';
  if (attributes.value.AGL >= 10) return 'D4';
  return '—';
});

// Other Character Details
const profession = ref('');
const weakness = ref('');
const memento = ref('');
const skills = ref([{ name: '', level: '' }]);
const gear = ref([{ item: '', weight: 1 }]); // Weight 1 is default

function addSkill() {
  skills.value.push({ name: '', level: '' });
}
function removeSkill(index) {
  skills.value.splice(index, 1);
}

function addGear() {
  gear.value.push({ item: '', weight: 1 });
}
function removeGear(index) {
  gear.value.splice(index, 1);
}

const encumbranceLimit = computed(() => Math.ceil(attributes.value.STR / 2));
const currentEncumbrance = computed(() => {
  return gear.value.reduce((total, g) => total + Number(g.weight || 0), 0);
});
const isOverEncumbered = computed(() => currentEncumbrance.value > encumbranceLimit.value);

</script>

<template>
  <div id="app" class="container">
    <header class="app-header">
      <img alt="Dragonbane logo placeholder" class="logo" src="./assets/logo.svg" width="100" height="100" />
      <h1>Dragonbane Character Generator</h1>
    </header>

    <main>
      <!-- Attributes -->
      <section class="attributes-section card">
        <h2>Attributes (3-18)</h2>
        <div class="grid-attributes">
          <div v-for="(value, attr) in attributes" :key="attr" class="attribute-input">
            <label :for="attr">{{ attr }}</label>
            <input type="number" :id="attr" v-model.number="attributes[attr]"
                   :min="attributeMin" :max="attributeMax" @change="validateAttribute(attr)" />
          </div>
        </div>
      </section>

      <!-- Kin Selection -->
      <section class="kin-section card">
        <h2>Kin</h2>
        <select v-model="selectedKin" class="kin-select">
          <option v-for="k in kinList" :key="k.name" :value="k">{{ k.name }}</option>
        </select>
        <div v-if="selectedKin" class="kin-ability">
          <h3>{{ selectedKin.abilityName }}</h3>
          <p>{{ selectedKin.abilityDescription }}</p>
        </div>
      </section>

      <!-- Derived Ratings -->
      <section class="derived-ratings-section card">
        <h2>Derived Ratings</h2>
        <div class="grid-derived">
          <p><strong>Hit Points (HP):</strong> {{ hitPoints }} (CON)</p>
          <p><strong>Willpower Points (WP):</strong> {{ willpowerPoints }} (WIL)</p>
          <div>
            <label for="movement"><strong>Movement:</strong> </label>
            <input id="movement" type="number" v-model.number="movement" min="0" style="width: 60px;"/> m
            <small class="db-hint">(Base value, adjust as per Kin/Profession if known. Pre-gens vary.)</small>
          </div>
          <p><strong>Damage Bonus (STR):</strong> {{ damageBonusSTR }} <small class="db-hint">(Approx. based on STR)</small></p>
          <p><strong>Damage Bonus (AGL):</strong> {{ damageBonusAGL }} <small class="db-hint">(Approx. based on AGL)</small></p>
        </div>
      </section>

      <!-- Character Details -->
      <section class="details-section card">
        <h2>Character Details</h2>
        <div>
          <label for="profession">Profession: </label>
          <input type="text" id="profession" v-model="profession" />
        </div>
        <div>
          <label for="weakness">Weakness: </label>
          <textarea id="weakness" v-model="weakness"></textarea>
        </div>
        <div>
          <label for="memento">Memento: </label>
          <textarea id="memento" v-model="memento"></textarea>
        </div>
      </section>

      <!-- Skills -->
      <section class="skills-section card">
        <h2>Skills (Level 1-18)</h2>
        <div v-for="(skill, index) in skills" :key="index" class="skill-entry">
          <input type="text" placeholder="Skill Name" v-model="skill.name" />
          <input type="number" placeholder="Lvl" v-model.number="skill.level" min="1" max="18" />
          <button @click="removeSkill(index)" class="remove-btn">X</button>
        </div>
        <button @click="addSkill" class="add-btn">Add Skill</button>
      </section>

      <!-- Gear & Encumbrance -->
      <section class="gear-section card">
        <h2>Gear & Inventory</h2>
        <p>
            Encumbrance Limit: {{ encumbranceLimit }} items (STR/2, rounded up)
            <br>
            Current Encumbrance: {{ currentEncumbrance }} items
            <span v-if="isOverEncumbered" class="over-encumbered-warning"> (Over-encumbered!)</span>
        </p>
        <div v-for="(g, index) in gear" :key="index" class="gear-entry">
          <input type="text" placeholder="Item Name" v-model="g.item" />
          <input type="number" placeholder="Weight" v-model.number="g.weight" min="0" title="Weight (1 for most items, 0 for tiny, >1 for heavy)" />
          <button @click="removeGear(index)" class="remove-btn">X</button>
        </div>
        <button @click="addGear" class="add-btn">Add Gear Item</button>
         <small class="db-hint">Tiny items (coins <100, fist-sized) are weight 0. Heavy items can be >1. Up to 4 rations = 1 item.</small>
      </section>

    </main>
    <footer class="app-footer">
      <p>Dragonbane Character Generator v0.1. Based on Dragonbane Quickstart PDF.</p>
    </footer>
  </div>
</template>

<style>
:root {
  --primary-color: #2c3e50;
  --secondary-color: #42b983;
  --background-color: #f4f4f4;
  --card-background: #ffffff;
  --text-color: #333;
  --border-radius: 8px;
  --box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  --input-border: #ccc;
  --input-focus-border: var(--secondary-color);
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: var(--background-color);
  color: var(--text-color);
  margin: 0;
  padding: 0;
  line-height: 1.6;
}

.container {
  max-width: 900px;
  margin: 20px auto;
  padding: 20px;
}

.app-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
}

.app-header .logo {
  margin-right: 20px;
}

.app-header h1 {
  color: var(--primary-color);
  margin: 0;
}

.card {
  background: var(--card-background);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  padding: 20px;
  margin-bottom: 25px;
}

.card h2 {
  color: var(--primary-color);
  margin-top: 0;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
  margin-bottom: 15px;
}
.card h3 {
  color: var(--primary-color);
  margin-top: 0;
  margin-bottom: 5px;
}

.grid-attributes, .grid-derived {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 15px;
}
.grid-derived p, .grid-derived div {
    padding: 5px;
    border: 1px solid #efefef;
    border-radius: 4px;
    background-color: #f9f9f9;
}


label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input[type="number"],
input[type="text"],
textarea,
select {
  width: 100%;
  padding: 10px;
  border: 1px solid var(--input-border);
  border-radius: 4px;
  box-sizing: border-box;
  margin-bottom: 10px;
  transition: border-color 0.3s;
}
input[type="number"]:focus,
input[type="text"]:focus,
textarea:focus,
select:focus {
  border-color: var(--input-focus-border);
  outline: none;
}
textarea {
  min-height: 60px;
  resize: vertical;
}

.attribute-input {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.attribute-input input {
  text-align: center;
  font-size: 1.2em;
  max-width: 80px;
}

.kin-select {
  margin-bottom: 15px;
}
.kin-ability {
  background-color: #eef8f3;
  border-left: 4px solid var(--secondary-color);
  padding: 15px;
  border-radius: 4px;
}
.kin-ability p {
  margin-bottom: 0;
}

.skill-entry, .gear-entry {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
  align-items: center;
}
.skill-entry input[type="text"], .gear-entry input[type="text"] {
  flex-grow: 1;
}
.skill-entry input[type="number"], .gear-entry input[type="number"] {
  width: 80px;
  margin-bottom: 0; /* Align with button */
}

.add-btn, .remove-btn {
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-weight: bold;
}
.add-btn {
  background-color: var(--secondary-color);
  color: white;
}
.add-btn:hover {
  background-color: #36a476;
}
.remove-btn {
  background-color: #e74c3c;
  color: white;
  padding: 5px 10px;
  font-size: 0.9em;
}
.remove-btn:hover {
  background-color: #c0392b;
}

.db-hint {
    font-size: 0.85em;
    color: #555;
    display: block;
    margin-top: -5px;
    margin-bottom: 5px;
}

.over-encumbered-warning {
    color: #c0392b;
    font-weight: bold;
}

.app-footer {
  text-align: center;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #eee;
  font-size: 0.9em;
  color: #777;
}

/* Make the default Vue logo less prominent if desired, or style it appropriately */
.logo {
  display: block;
  /* margin: 0 auto 2rem; */ /* Original was centered above content */
}

/* Adjustments from default Vue App.vue styling if any were conflicting */
header { /* This was from default App.vue, ensure it doesn't conflict with .app-header */
  line-height: 1.5;
}

@media (min-width: 768px) {
  .skill-entry input[type="text"], .gear-entry input[type="text"] {
    /* Allow more space if needed on larger screens */
  }
}

@media (min-width: 1024px) {
  /* header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  } */ /* Removing default layout for header to use simpler flex in .app-header */
}
</style>
