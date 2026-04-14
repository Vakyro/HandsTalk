"use client"

import { SectionHeader } from '@/components/ui/section-header'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const faqs = [
  {
    question: 'What sign languages does HandsTalk support?',
    answer: 'HandsTalk currently supports American Sign Language (ASL) with plans to add British Sign Language (BSL), French Sign Language (LSF), and other regional variants. Each language has its own unique grammar and vocabulary that our AI is trained to recognize and generate.',
  },
  {
    question: 'How accurate is the sign-to-text translation?',
    answer: 'Our AI achieves high accuracy for common phrases and gestures, with confidence scores shown for each translation. For best results in Normal mode, ensure good lighting and a clear view of the signer. Live mode provides real-time feedback but may have slightly lower accuracy for complex phrases.',
  },
  {
    question: 'What is the difference between Normal and Live mode?',
    answer: 'Normal mode lets you upload or record a complete video for thorough analysis and phrase-level interpretation. Live mode provides real-time translation as you sign, ideal for instant communication. Normal mode is better for accuracy, while Live mode is better for conversational use.',
  },
  {
    question: 'How does text-to-sign video generation work?',
    answer: 'When you enter text, our AI analyzes the phrase structure and generates a natural sign language video performance. You can adjust playback speed, choose regional variations, and select avatar styles. The generated videos show proper grammar, including facial expressions and body movement.',
  },
  {
    question: 'Is HandsTalk free to use?',
    answer: 'HandsTalk offers a free tier with access to basic translation features and learning content. Premium features include unlimited translations, advanced learning courses, detailed analytics, and priority processing. Check our pricing page for current plans.',
  },
  {
    question: 'Can I save my translations?',
    answer: 'Yes! When logged in, you can save both sign-to-text and text-to-sign translations to your personal library. Access them anytime from the Saved section to review, replay, or share with others.',
  },
  {
    question: 'How does the learning system work?',
    answer: 'Our learning platform uses a gamified approach inspired by language learning apps. Progress through structured courses, practice with interactive exercises, earn XP and badges, and maintain daily streaks. Activities include multiple choice, typing answers, watching and interpreting videos, and recording yourself.',
  },
  {
    question: 'Do I need special equipment?',
    answer: 'No special equipment is needed. Any device with a camera (smartphone, tablet, laptop) works for sign-to-text translation. For the best experience, ensure good lighting and position yourself so your upper body and hands are clearly visible.',
  },
]

export function FAQSection() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="FAQ"
          title="Frequently Asked Questions"
          description="Everything you need to know about using HandsTalk for translation and learning."
        />

        <Accordion type="single" collapsible className="mt-12">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="border-border/50"
            >
              <AccordionTrigger className="text-left text-foreground hover:text-primary hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
