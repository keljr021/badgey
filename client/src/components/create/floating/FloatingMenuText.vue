<script setup>
import { defineEmits, toRefs, ref, onMounted } from 'vue'
import './floatingMenu.css';

const emit = defineEmits([ 'text:update' ]);

const props = defineProps({
  node: Object,
});

const { node } = toRefs(props);


const textInput = ref('');
const textFont = ref('Arial');
const textSize = ref(12);

const textBold = ref(false);
const textItalic = ref(false);
const textUnderline = ref(false);
const textAlign = ref('left');

const fontList = ref([
  {
    fontFamily: 'Arial',
    value: 'Arial',
  }
]);

const updateText = (input) => {

  let outputStyle = 'normal';

  if (input === 'style') {
    console.log('text bold: ', textBold.value, ' - text italic: ', textItalic.value);

    if (textBold.value === true && textItalic.value === true)
      outputStyle = 'bold italic';

    if (textBold.value === true && textItalic.value === false)
      outputStyle = 'bold';

    if (textBold.value === false && textItalic.value === true)
      outputStyle = 'italic';
  }

  switch(input) {
    case 'input':
      emit('text:update', { konvaValues: { text: textInput.value } });
      break;
    case 'font':
      emit('text:update', { konvaValues: { fontFamily: textFont.value } });
      break;      
    case 'size':
      emit('text:update', { konvaValues: { fontSize: textSize.value } });
      break;
    case 'style':
      emit('text:update', { konvaValues: { fontStyle: outputStyle }});
      break;
    case 'decoration':
      emit('text:update', { konvaValues: { textDecoration: (textUnderline.value) ? 'underline' : '' }});
      break;
    case 'align':
      emit('text:update', { konvaValues: { align: textAlign.value } });
      break;    
    default:
      break;
  }
};

const setValues = () => {
  console.log('node: ', node.value);

  const { attrs } = node.value;

  textInput.value = attrs.text;
  textFont.value = attrs.fontFamily;
  textSize.value = attrs.fontSize;

  if (attrs.fontStyle) {
    console.log('font style: ',attrs.fontStyle);
    const style = attrs.fontStyle;
    textBold.value = style.indexOf('bold') > -1;
    textItalic.value = style.indexOf('itaic') > -1;
  }
  textUnderline.value = (attrs.textDecoration === 'underline');
  textAlign.value = attrs.align;
}

const toggleButtonValues = (value) => {

  if (value === 'bold') {
    textBold.value = !textBold.value;
    updateText('style');
  }

  if (value === 'italic') {
    textItalic.value = !textItalic.value;
    updateText('style');
  }

  if (value === 'underline') {
    textUnderline.value = !textUnderline.value;
    updateText('decoration');
  }

  if (value === 'left' || value === 'center' || value === 'right') {
    textAlign.value = value;
    updateText('align');
  }
}

onMounted(() => {
  setValues();
})
</script>

<template>
  <div ref="menuRef" class="float-text">
    <div class="float-text-input">
      Input: <br />
      <UTextarea v-model="textInput" @change="updateText('input')" :rows="2" class="w-60 py-2" />
    </div>
    <div class="float-text-menu">
      <div class="float-text-menu-font">
        Font: <br />
        <USelectMenu v-model="textFont" :items="fontList" @change="updateText('font')" class="w-25 py-2" />
      </div>
      <div class="float-text-menu-size">
        Size: <br />
        <UInputNumber v-model="textSize" @update:modelValue="updateText('size')" orientation="horizontal" class="w-25 py-2" increment="xs" decrement="xs" :min="2" />
      </div>
      <div class="float-text-menu-style">
        Style: <br />
        <UFieldGroup orientation="horizontal" class="py-2">
          <UTooltip text="Bold">
            <UButton @click="toggleButtonValues('bold')" :color="textBold === true ? 'success' : 'neutral'" variant="outline" icon="i-lucide-bold" />
          </UTooltip>
          <UTooltip text="Italic">
            <UButton @click="toggleButtonValues('italic')" :color="textItalic === true ? 'success' : 'neutral'" variant="outline" icon="i-lucide-italic" />
          </UTooltip>
          <UTooltip text="Underline">
            <UButton @click="toggleButtonValues('underline')" :color="textUnderline === true ? 'success' : 'neutral'" variant="outline" icon="i-lucide-underline" />
          </UTooltip>
        </UFieldGroup>
      </div>
      <div class="float-text-menu-align">
        Style: <br />
        <UFieldGroup orientation="horizontal" class="py-2">
          <UTooltip text="Left align">
            <UButton @click="toggleButtonValues('left')" :color="textAlign === 'left' ? 'success' : 'neutral'" variant="outline" icon="i-lucide-align-left" />
          </UTooltip>
          <UTooltip text="Center align">
            <UButton @click="toggleButtonValues('center')" :color="textAlign === 'center' ? 'success' : 'neutral'" variant="outline" icon="i-lucide-align-center" />
          </UTooltip>
          <UTooltip text="Right align">
            <UButton @click="toggleButtonValues('right')" :color="textAlign === 'right' ? 'success' : 'neutral'" variant="outline" icon="i-lucide-align-right" />
          </UTooltip>
        </UFieldGroup>
      </div>
    </div>
  </div>
</template>
