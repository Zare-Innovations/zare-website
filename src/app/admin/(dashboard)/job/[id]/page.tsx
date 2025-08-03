'use client';

import {
  Text,
  Group,
  Button,
  TextInput,
  Select,
  Grid,
  Card,
  NumberInput,
  Container,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { RichTextEditor as RTE, Link } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import { useForm, zodResolver } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import { IconCalendar, IconCheck, IconAlertCircle } from '@tabler/icons-react';
import { useState } from 'react';
import { z } from 'zod';
import '@mantine/tiptap/styles.css';
import { SearchablePill } from '../../_components/searchable-pill';
import { Job, useCreateJobMutation } from '@/store/api/auth/job.api';
import { useRouter } from 'next/navigation';

// Zod validation schema


const today = new Date();
today.setHours(0, 0, 0, 0); // remove time component for clean comparison

export const jobSchema = z
  .object({
    title: z
      .string()
      .min(2, 'Job title must be at least 2 characters')
      .max(100, 'Job title must be less than 100 characters')
      .nonempty('Job title is required'),

    yearsOfExperience: z
      .number()
      .min(0, 'Years of experience cannot be negative')
      .max(50, 'Years of experience cannot exceed 50')
      .int('Years of experience must be a whole number'),

    location: z
      .string()
      .min(2, 'Location must be at least 2 characters')
      .max(100, 'Location must be less than 100 characters')
      .nonempty('Location is required'),

    type: z.enum(['Remote', 'On-site', 'Hybrid'], {
      errorMap: () => ({ message: 'Please select a valid job type' }),
    }),

    workType: z.enum(['Full-Time', 'Part-Time', 'Contract', 'Freelance'], {
      errorMap: () => ({ message: 'Please select a valid work type' }),
    }),

    skills: z
      .array(z.string())
      .min(1, 'At least one skill is required')
      .max(10, 'Maximum 10 skills allowed'),

    startDate: z.preprocess(
      (val) => (val instanceof Date ? val : null),
      z
        .date({
          required_error: 'Start date is required',
          invalid_type_error: 'Please enter a valid start date',
        })
        .refine((date) => {
          const now = new Date();
          now.setHours(0, 0, 0, 0);
          return date >= now;
        }, {
          message: 'Start date cannot be in the past',
        })
    ),

    endDate: z.preprocess(
      (val) => (val instanceof Date ? val : null),
      z.date({
        required_error: 'End date is required',
        invalid_type_error: 'Please enter a valid end date',
      })
    ),

    description: z
      .string()
      .min(10, 'Job description must be at least 10 characters')
      .nonempty('Job description is required'),
  })
  .refine(
    (data) => data.endDate > data.startDate,
    {
      path: ['endDate'],
      message: 'End date must be after start date',
    }
  );

type JobFormData = z.infer<typeof jobSchema>;

export default function JobCreationForm() {
  const [descriptionLength, setDescriptionLength] = useState(0);
  const router = useRouter();
  const [createJob, { isLoading: isJobCreated }] = useCreateJobMutation();

  const form = useForm<JobFormData>({
    validate: zodResolver(jobSchema),
    initialValues: {
      title: '',
      yearsOfExperience: 2,
      location: '',
      type: 'Remote',
      workType: 'Full-Time',
      skills: [],
      startDate: new Date(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      description: '',
    },
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
    ],
    content: form.values.description || '',
    onUpdate: ({ editor }) => {
      const content = editor.getText();
      setDescriptionLength(content.length);
      form.setFieldValue('description', content);
    },
  });

  const handleSubmit = async (values: JobFormData) => {
    try{
    const job = { ...values, skills: values.skills.join(','), startDate: values.startDate.toUTCString(), endDate: values.endDate.toUTCString() } as Job
    const res = await createJob(job).unwrap();
    notifications.show({
      title: 'Success!',
      message: 'Job posting has been created successfully',
      color: 'teal',
      icon: <IconCheck size={16} />,
    });

    router.push('/admin/job');
  }
    catch (err) {
        notifications.show({
          title: "Job posting  Failed",
          message: "Please try again later.",
          color: "red",
        });
      }


  };

  const handleSubmitError = (errors: typeof form.errors) => {
    notifications.show({
      title: 'Validation Error',
      message: 'Please fix the errors in the form before submitting',
      color: 'red',
      icon: <IconAlertCircle size={16} />,
    });
  };

  return (
    <Container size="lg" py="xl">
      <div>
        <div className="p-4 rounded-lg bg-white mb-6">
          <Text size="xl" color="dark">
            Create a Job
          </Text>
          <Text size="sm" color="gray.6">
            Fill out the form below to create a new job listing.
          </Text>
        </div>

        <Card shadow="sm" p="xl" radius="md">
          <form onSubmit={form.onSubmit(handleSubmit, handleSubmitError)}>
            <Grid>
              <Grid.Col span={6}>
                <TextInput
                  label="Job Title"
                  placeholder="Enter job title"
                  size="md"
                  withAsterisk
                  {...form.getInputProps('title')}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <NumberInput
                  label="Years of Experience"
                  placeholder="Enter years of experience"
                  size="md"
                  withAsterisk
                  min={0}
                  max={50}
                  {...form.getInputProps('yearsOfExperience')}
                />
              </Grid.Col>

              <Grid.Col span={6}>
                <TextInput
                  label="Location"
                  placeholder="Enter location"
                  size="md"
                  withAsterisk
                  {...form.getInputProps('location')}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <Select
                  label="Job Type"
                  placeholder="Select job type"
                  data={['Remote', 'On-site', 'Hybrid']}
                  size="md"
                  withAsterisk
                  {...form.getInputProps('jobType')}
                />
              </Grid.Col>

              <Grid.Col span={6}>
                <Select
                  label="Work Type"
                  placeholder="Select work type"
                  data={['Full-Time', 'Part-Time', 'Contract', 'Freelance']}
                  size="md"
                  withAsterisk
                  {...form.getInputProps('workType')}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <div>
                  <Text size="sm" mb="xs">
                    <span className="font-medium">Skills</span>{' '}
                    <span style={{ color: 'red' }}>* </span>
                  </Text>

                  <SearchablePill
                    value={form.getInputProps('skills').value as string[]}
                    setValue={(value: string[]) => {
                      form.setFieldValue('skills', [...value]);
                    }}
                  />
                  {form.errors.skills && (
                    <Text color="red" size="sm" mt="xs">
                      {form.errors.skills}
                    </Text>
                  )}
                </div>
              </Grid.Col>
              <Grid.Col span={6}>
                <DateInput
                  label="Start Date"
                  placeholder="Select start date"
                  size="md"
                  withAsterisk
                  rightSection={<IconCalendar size={16} />}
                  {...form.getInputProps('startDate')}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <DateInput
                  label="End Date"
                  placeholder="Select end date"
                  size="md"
                  withAsterisk
                  rightSection={<IconCalendar size={16} />}
                  {...form.getInputProps('endDate')}
                />
              </Grid.Col>


              <Grid.Col span={12}>
                <div>
                  <Text size="sm" mb="xs">
                    <span className="font-medium">Job Description</span>
                    <span style={{ color: 'red' }}>* </span>
                  </Text>
                  <RTE editor={editor}>
                    <RTE.Content />

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
                    {form.errors.description && (
                      <Text color="red" size="sm">
                        {form.errors.description}
                      </Text>
                    )}
                    <Text
                      size="xs"
                      color={descriptionLength > 400 ? 'red' : 'gray.6'}
                      ml="auto"
                    >
                      {descriptionLength} / 400
                    </Text>
                  </Group>
                </div>
              </Grid.Col>
            </Grid>

            <Group mt="xl">
              <Button
                type="submit"
                size="md"
                color="dark"
                style={{ backgroundColor: '#1a365d' }}
                loading={form.submitting}
              >
                Submit
              </Button>
            </Group>
          </form>
        </Card>
      </div>
    </Container>
  );
}
