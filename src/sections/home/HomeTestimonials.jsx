import React, { useEffect, useState } from 'react';
import TestimonialHighlight from '@/components/ui/public/home/TestimonialHighlight';
import PublicSection from '@/components/ui/public/base/PublicSection';
import { getTestimonialsData } from '@/services/homeAPI';

const DEFAULT_TESTIMONIAL = {
    client_name: 'Nome Cliente',
    text: 'A mentoria com a Cheila foi um divisor de águas na minha carreira. A clareza que obtive sobre meus objetivos e a confiança para liderar mudaram minha trajetória.'
};

const HomeTestimonials = () => {
    const [testimonial, setTestimonial] = useState(DEFAULT_TESTIMONIAL);

    useEffect(() => {
        const loadData = async () => {
            try {
                const testimonialsDoc = await getTestimonialsData();

                if (Array.isArray(testimonialsDoc?.testimonials) && testimonialsDoc.testimonials.length) {
                    const firstTestimonial = testimonialsDoc.testimonials[0];
                    setTestimonial({
                        client_name: firstTestimonial.client_name || firstTestimonial.name || DEFAULT_TESTIMONIAL.client_name,
                        text: firstTestimonial.text || DEFAULT_TESTIMONIAL.text
                    });
                }
            } catch (error) {
                console.error('Erro ao carregar depoimentos:', error);
            }
        };

        loadData();
    }, []);

    return (
        <PublicSection
            background="linear-gradient(180deg, #f5f5f5 0%, #fafafa 50%, #f5f5f5 100%)"
            padding="0 60px"
            justifyContent="center"
        >
            <TestimonialHighlight
                clientName={testimonial.client_name}
                text={testimonial.text}
            />
        </PublicSection>
    );
};

export default HomeTestimonials;