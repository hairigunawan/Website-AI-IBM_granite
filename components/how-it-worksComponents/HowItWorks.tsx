'use client'

import React from 'react';
import '../app/globals.css';
import Hero from './Hero';
import CodeDemo from './CodeDemo';
import Steps from './Steps';
import AdvancedFeatures from './AdvancedFeatures';
import TechnicalSpecs from './TechnicalSpecs';

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