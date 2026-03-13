import React from 'react';
import TestimonialHighlight from '@/components/ui/public/home/TestimonialHighlight';
import PublicSection from '@/components/ui/public/base/PublicSection';
 
export default function HomeTestimonials({ data }) {
    const testimonials = Array.isArray(data?.testimonials) ? data.testimonials : [];

    return (
        <PublicSection
            background="linear-gradient(180deg, #f5f5f5 0%, #fafafa 50%, #f5f5f5 100%)"
            padding="0 60px"
            justifyContent="center"
        >
            {testimonials.map((testimonial, index) => (
                <TestimonialHighlight
                    key={testimonial.id || `${testimonial.client_name || 'cliente'}-${index}`}
                    clientName={testimonial.client_name || testimonial.name}
                    text={testimonial.text}
                />
            ))}
        </PublicSection>
    );
}