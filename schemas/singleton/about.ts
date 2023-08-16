import { UserIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'about-us',
  type: 'document',
  title: 'About',
  fields: [
    { name: 'title', type: 'string', title: 'Title' },
    { name: 'description', type: 'text', title: 'Description' },
    // Add other fields as needed
  ],
  // Set this option to ensure only one instance of this document type
  options: {
    singleton: true,
  },
})
