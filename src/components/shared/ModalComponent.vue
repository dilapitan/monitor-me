<template>
  <v-dialog :value="dialog" width="500" persistent>
    <v-card>
      <v-card-title class="text-h5 offColor white--text">
        {{ action === 'edit' ? 'Edit Status' : 'Delete Status' }}
      </v-card-title>

      <v-card-text>
        <template v-if="action === 'edit'">
          <br />
          <FormComponent
            :statusData="modalData"
            @closeModal="closeModal"
            :dialog="dialog"
          />
        </template>
        <template v-else> For Delete </template>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions v-if="action === 'delete'">
        <v-spacer></v-spacer>
        <v-btn color="grey" text small @click="closeModal()">Cancel</v-btn>
        <v-btn
          class="white--text"
          small
          color="destructive"
          @click="closeModal()"
        >
          Delete
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
