import { createClient } from '@supabase/supabase-js'
import fs from 'fs'

const supabaseUrl = 'https://kshmtzeqwovezlkkficd.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY || 'sb_publishable_Ywx31UbT_yZPfqJt1dvN2w_9jMLw6JX' // from .env.local

const supabase = createClient(supabaseUrl, supabaseKey)

async function uploadFile(filename) {
  console.log(`Uploading ${filename}...`);
  const fileContent = fs.readFileSync(`./public/${filename}`)
  
  const { data, error } = await supabase
    .storage
    .from('resume')
    .upload(filename, fileContent, {
      upsert: true,
      contentType: 'text/markdown'
    })
    
  if (error) {
    console.error(`Error uploading ${filename}:`, error.message)
  } else {
    console.log(`Success! Uploaded ${filename}:`, data)
  }
}

async function main() {
  await uploadFile('resume-v1-ai.md')
  await uploadFile('resume-v1-ld.md')
}

main()
