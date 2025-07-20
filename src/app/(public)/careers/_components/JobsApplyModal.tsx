'use client';

import {
  Group,
  Modal,
  Stack,
  Text,
  TextInput
} from '@mantine/core';
import { Dropzone, FileWithPath } from '@mantine/dropzone';
import { useForm, zodResolver } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { Link, RichTextEditor as RTE } from '@mantine/tiptap';
import '@mantine/tiptap/styles.css';
import { IconArrowRight, IconUpload } from '@tabler/icons-react';
import Highlight from '@tiptap/extension-highlight';
import SubScript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useState } from 'react';

import Placeholder from '@tiptap/extension-placeholder';

import { z } from 'zod';



const schema = z.object({
  fullName: z.string().min(1, 'Full Name is required'),
  email: z.string().email('Invalid email'),
  resume: z
    .custom<File>((file) => file instanceof File, {
      message: 'Resume is required',
    })
    .refine(
      (file) => file.size <= 5 * 1024 * 1024, // 5MB size check
      {
        message: 'File must be 5MB or less',
      }
    ),
});


export default function JobsApplyModal() {
  const [open, { toggle, close }] = useDisclosure();

  const form = useForm<{
    fullName: string;
    email: string;
    resume: File | null;
  }>({
    initialValues: {
      fullName: '',
      email: '',
      resume: null,
    },
    validate: zodResolver(schema),
  });
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Placeholder.configure({
        placeholder:
          'Write down your biography here. Let the employers know who you are...',
      }),
    ],
  });

  const handleSubmit = async (values: typeof form.values) => {
    console.log('Submitting values:', {
      ...values,
      resume: resumeFile?.name,
      coverLetter: editor?.getHTML() || '',
    });

    close();
  };



  // const editor = useEditor({
  //   extensions: [
  //     StarterKit,
  //     Underline,
  //     Link,
  //     Superscript,
  //           Placeholder.configure({

  //       placeholder: 'Write down your biography here. Let the employers know who you are...',
  //     }),

  //     Highlight,
  //     TextAlign.configure({ types: ['heading', 'paragraph'] }),
  //   ],

  //   // content: form.values.jobDescription || '',
  //   // onUpdate: ({ editor }) => {
  //   //   const content = editor.getText();
  //   //   setDescriptionLength(content.length);
  //   //   form.setFieldValue('jobDescription', content);
  //   // },
  // });


  const [resumeFile, setResumeFile] = useState<FileWithPath | null>(null);




  return (
    <Group >
      <button
        onClick={toggle}
        className="text-[0.7rem] font-semibold bg-[#0A293B] text-white px-6 sm:px-10 py-2 rounded-lg hover:bg-teal-800 transition w-full sm:w-auto"
      >
        Apply
      </button>

   
      <Modal
        opened={open}
        onClose={close}
        size={700}
        withCloseButton={false}

        closeOnClickOutside={false}   // ✅ Disable outside click to close
        styles={{
          content: {
            backgroundColor: '#ffffff',
            position: 'relative',
          },
        }}
      >
        {/* Close Icon at top right corner */}
        <button
          onClick={close}
          aria-label="Close"
          className="absolute top-3 right-3 flex items-center justify-center transition"
          style={{
            border: '1px solid #e2e8f0',
            padding: 0,
            cursor: 'pointer',
            color: '#00A9AB',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            boxShadow: '0 2px 4px rgba(0,0,0,0.06)',
            lineHeight: 1,
            transition: 'background 0.2s, color 0.2s',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.background = '#e6f7f7';
            (e.currentTarget as HTMLButtonElement).style.color = '#007c7e';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.background = '';
            (e.currentTarget as HTMLButtonElement).style.color = '#00A9AB';
          }}
        >
          <span
            style={{
              fontSize: '1.8rem',
              fontWeight: 300,
              display: 'block',
              marginTop: '-4px',
              color: 'inherit',
            }}
          >
            &times;
          </span>
        </button>









        <form >
          <Stack className='px-[1rem] ' >

            <div className="text-[1.125rem] font-medium text-[#1e293b] leading-tight tracking-tight">
              Senior UX Designer
            </div>

            <Stack>
              <Text c="#000000">
                Full Name <span style={{ color: 'red' }}>*</span>
              </Text>
              <TextInput
                placeholder="Full Name"
                {...form.getInputProps('fullName')}
                styles={{ input: { border: '1px solid #f3f3f3' } }}
              />
            </Stack>

            <Stack>
              <Text c="#000000">
                Email Address <span style={{ color: 'red' }}>*</span>
              </Text>
              <TextInput
                placeholder="Email Address"
                {...form.getInputProps('email')}
                type="email"
                styles={{ input: { border: '1px solid #f3f3f3' } }}
              />
            </Stack>
            <Stack>
              <Text c="#000000">
                Upload Your Resume <span style={{ color: 'red' }}>*</span>
              </Text>

              {/* Show Dropzone only when no file is uploaded */}
              {!resumeFile && (
                <Dropzone
                  onDrop={(files) => {
                    const file = files[0];
                    setResumeFile(file);
                    form.setFieldValue('resume', file);
                  }}
                  multiple={false}
                  accept={[
                    'application/pdf',
                    'application/msword',
                    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                  ]}
                  maxSize={5 * 1024 ** 2}
                  styles={{
                    root: {
                      backgroundColor: '#ffffff',
                      border: '1px solid #e1dcdcff',
                      borderRadius: '8px',
                      padding: '1.8rem',
                      textAlign: 'center',
                      minHeight: '4.7rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                    },
                  }}
                >
                  <Group align="center" gap="xs">
                    <IconUpload size={24} stroke={1.5} color="#00A9AB" />
                    <Text size="sm" c="#00A9AB">
                      Drop your resume here or click to upload
                    </Text>
                  </Group>
                </Dropzone>
              )}

              {/* File display with remove button */}
              {resumeFile && (
                <Group
                  justify="space-between"
                  mt="xs"
                  px="md"
                  py="sm"
                  style={{
                    border: '1px solid #e1dcdcff',
                    borderRadius: '8px',
                    background: '#f9f9f9',
                  }}
                >
                  <Text size="sm" fw={500}>
                    {resumeFile.name}
                  </Text>
                  <button
                    type="button"
                    onClick={() => {
                      setResumeFile(null);
                      form.setFieldValue('resume', null);
                    }}
                    className="text-red-500 hover:text-red-700 text-lg font-semibold"
                    aria-label="Remove file"
                  >
                    &times;
                  </button>
                </Group>
              )}

              {form.errors.resume && (
                <Text size="xs" c="red">
                  {form.errors.resume}
                </Text>
              )}
            </Stack>




            <Stack >



              <div>
                <Text size="sm" mb="xs">
                  <Text c="#000000"> Cover Letter</Text>
                </Text>
                <RTE editor={editor}>
                  <RTE.Content
                    style={{
                      fontSize: '0.9rem',
                      backgroundColor: '#f8f8f8',
                      border: '1px solid #f3f3f3',
                      borderRadius: '8px',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                    }}

                  />

                  <RTE.Toolbar>
                    <RTE.ControlsGroup>
                      <RTE.Bold />
                      <RTE.Italic />
                      <RTE.Underline />
                      <RTE.Strikethrough />
                    </RTE.ControlsGroup>

                    <RTE.ControlsGroup>
                      <RTE.BulletList />
                      <RTE.OrderedList />
                    </RTE.ControlsGroup>

                    <RTE.ControlsGroup>
                      <RTE.Link />
                      <RTE.Unlink />
                    </RTE.ControlsGroup>
                  </RTE.Toolbar>
                </RTE>
                <Group mt="xs">


                </Group>
              </div>



            </Stack>

            {/* Submit Button */}
            <Group justify="space-between" className="mt-4 w-full">
              <button
                type="button"
                onClick={close}
                className="bg-[#F0FDFA] text-gray-800 text-[0.9rem] px-6 py-2 rounded-md hover:opacity-90 transition-opacity"
              >
                Cancel
              </button>



              <button
                // onClick={handleSubmit}
                className="bg-[#0a293b] text-white text-[.9rem] px-6 py-2 rounded-md hover:opacity-90 transition-opacity flex items-center gap-2"
              >
                Apply Now
                <IconArrowRight size={18} stroke={1.5} />
              </button>
            </Group>
          </Stack>

        </form>
      </Modal>
    </Group>

  );
}
