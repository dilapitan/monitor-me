<template>
  <v-dialog :value="dialog" width="500" persistent>
    <v-card>
      <v-card-title class="text-h5 grey lighten-2">
        {{ action === 'edit' ? 'Edit Status' : 'Delete Status' }}
      </v-card-title>

      <v-card-text>
        <template v-if="action === 'edit'">
          <FormComponent :statusData="modalData" @closeModal="closeModal" />
        </template>
        <template v-else> For Delete </template>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions v-if="action === 'delete'">
        <v-spacer></v-spacer>
        <v-btn color="grey" text @click="closeModal()">Cancel</v-btn>
        <v-btn
          class="white--text"
          :color="action === 'edit' ? 'primary' : 'destructive'"
          @click="closeModal()"
        >
          {{ action === 'edit' ? 'Save' : 'Delete' }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import FormComponent from '@/components/shared/FormComponent'

export default {
  name: 'Modal',

  components: {
    FormComponent,
  },

  props: {
    action: {
      type: String,
      required: true,
    },
    dialog: {
      type: Boolean,
      required: true,
    },
    modalData: {
      required: true,
    },
  },

  methods: {
    closeModal() {
      this.$emit('closeModal')
    },
  },
}
</script>
