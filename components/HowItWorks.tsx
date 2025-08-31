'use client'

import React from 'react';
import '../app/globals.css';
import Hero from './how-it-worksComponents/Hero';
import CodeDemo from './how-it-worksComponents/CodeDemo';
import Steps from './how-it-worksComponents/Steps';
import AdvancedFeatures from './how-it-worksComponents/AdvancedFeatures';
import TechnicalSpecs from './how-it-worksComponents/TechnicalSpecs';

const HowItWorks = () => {
    return (
        <div className="text-slate-800">
            <div className="mx-auto py-16 md:py-20">
                <Hero />
                <CodeDemo />
                <Steps />
                <AdvancedFeatures />
                <TechnicalSpecs />
            </div>
        </div>
    );
};

export default HowItWorks;