import { Injectable } from '@angular/core';
import { Resume, Skill } from '../models';

export interface ATSScore {
  overall: number;
  sections: {
    keywords: number;
    formatting: number;
    sections: number;
    length: number;
  };
  suggestions: string[];
}

export interface KeywordSuggestion {
  category: string;
  keywords: string[];
  importance: 'high' | 'medium' | 'low';
}

@Injectable({
  providedIn: 'root'
})
export class ATSOptimizerService {
  private industryKeywords: Record<string, string[]> = {
    'technology': [
      'software development', 'programming', 'javascript', 'python', 'java',
      'react', 'angular', 'node.js', 'typescript', 'sql', 'git', 'agile',
      'scrum', 'aws', 'cloud computing', 'docker', 'kubernetes'
    ],
    'marketing': [
      'digital marketing', 'seo', 'social media', 'content marketing',
      'google analytics', 'ppc', 'email marketing', 'brand management',
      'market research', 'lead generation', 'conversion optimization'
    ],
    'finance': [
      'financial analysis', 'excel', 'accounting', 'budgeting', 'forecasting',
      'risk management', 'compliance', 'audit', 'gaap', 'financial modeling',
      'investment analysis', 'portfolio management'
    ],
    'design': [
      'ui/ux design', 'adobe creative suite', 'figma', 'sketch', 'prototyping',
      'user research', 'wireframing', 'visual design', 'interaction design',
      'design thinking', 'accessibility', 'responsive design'
    ]
  };

  analyzeResume(resume: Resume): ATSScore {
    const suggestions: string[] = [];
    
    // Analyze keywords
    const keywordScore = this.analyzeKeywords(resume);
    if (keywordScore < 70) {
      suggestions.push('Add more industry-relevant keywords to improve ATS matching');
    }

    // Analyze formatting
    const formattingScore = this.analyzeFormatting(resume);
    if (formattingScore < 80) {
      suggestions.push('Use standard section headers and consistent formatting');
    }

    // Analyze sections
    const sectionScore = this.analyzeSections(resume);
    if (sectionScore < 90) {
      suggestions.push('Include all essential sections: work experience, education, and skills');
    }

    // Analyze length
    const lengthScore = this.analyzeLength(resume);
    if (lengthScore < 80) {
      suggestions.push('Optimize resume length - aim for 1-2 pages with concise descriptions');
    }

    const overall = Math.round((keywordScore + formattingScore + sectionScore + lengthScore) / 4);

    return {
      overall,
      sections: {
        keywords: keywordScore,
        formatting: formattingScore,
        sections: sectionScore,
        length: lengthScore
      },
      suggestions
    };
  }

  getKeywordSuggestions(industry: string, currentSkills: Skill[]): KeywordSuggestion[] {
    const industryKeys = this.industryKeywords[industry.toLowerCase()] || [];
    const currentKeywords = currentSkills.map(skill => skill.name.toLowerCase());
    
    const missingKeywords = industryKeys.filter(keyword => 
      !currentKeywords.some(current => current.includes(keyword.toLowerCase()))
    );

    return [
      {
        category: 'Technical Skills',
        keywords: missingKeywords.slice(0, 5),
        importance: 'high'
      },
      {
        category: 'Industry Terms',
        keywords: missingKeywords.slice(5, 10),
        importance: 'medium'
      },
      {
        category: 'Additional Keywords',
        keywords: missingKeywords.slice(10, 15),
        importance: 'low'
      }
    ].filter(suggestion => suggestion.keywords.length > 0);
  }

  optimizeJobDescription(description: string): string {
    // Remove weak words and improve action verbs
    const weakWords = ['responsible for', 'worked on', 'helped with', 'assisted'];
    const strongVerbs = ['developed', 'implemented', 'managed', 'created', 'optimized', 'delivered'];
    
    let optimized = description;
    
    // Replace weak phrases with stronger alternatives
    weakWords.forEach(weak => {
      if (optimized.toLowerCase().includes(weak)) {
        const randomVerb = strongVerbs[Math.floor(Math.random() * strongVerbs.length)];
        optimized = optimized.replace(new RegExp(weak, 'gi'), randomVerb);
      }
    });

    // Ensure bullets start with action verbs
    if (!optimized.match(/^[A-Z][a-z]+ed|^[A-Z][a-z]+/)) {
      const verb = strongVerbs[Math.floor(Math.random() * strongVerbs.length)];
      optimized = verb.charAt(0).toUpperCase() + verb.slice(1) + ' ' + optimized.toLowerCase();
    }

    return optimized;
  }

  private analyzeKeywords(resume: Resume): number {
    let keywordCount = 0;
    let totalPossible = 20; // Base expectation

    // Check skills section
    keywordCount += resume.skills.length;

    // Check job descriptions for action verbs and technical terms
    resume.workExperience.forEach(exp => {
      exp.description.forEach(desc => {
        if (this.containsActionVerb(desc)) keywordCount++;
        if (this.containsTechnicalTerm(desc)) keywordCount++;
      });
    });

    return Math.min(100, (keywordCount / totalPossible) * 100);
  }

  private analyzeFormatting(resume: Resume): number {
    let score = 100;

    // Check for consistent date formatting
    const workDates = resume.workExperience.map(exp => 
      `${exp.startDate} - ${exp.endDate || 'Present'}`
    );
    // Simple check - in real implementation, would be more sophisticated
    
    // Check for complete contact information
    const contact = resume.personalInfo;
    if (!contact.email || !contact.phone) score -= 20;
    if (!contact.address || !contact.city) score -= 10;

    return Math.max(0, score);
  }

  private analyzeSections(resume: Resume): number {
    let score = 0;

    // Essential sections
    if (resume.personalInfo.firstName && resume.personalInfo.lastName) score += 20;
    if (resume.personalInfo.email && resume.personalInfo.phone) score += 20;
    if (resume.workExperience.length > 0) score += 30;
    if (resume.education.length > 0) score += 20;
    if (resume.skills.length > 0) score += 10;

    return score;
  }

  private analyzeLength(resume: Resume): number {
    // Estimate content length
    let contentLength = 0;
    
    contentLength += resume.personalInfo.summary?.length || 0;
    contentLength += resume.workExperience.reduce((acc, exp) => 
      acc + exp.description.join(' ').length, 0
    );
    contentLength += resume.education.length * 100; // Estimate
    contentLength += resume.skills.length * 20; // Estimate

    // Optimal range: 1000-3000 characters
    if (contentLength >= 1000 && contentLength <= 3000) return 100;
    if (contentLength < 1000) return Math.max(20, (contentLength / 1000) * 100);
    if (contentLength > 3000) return Math.max(20, 100 - ((contentLength - 3000) / 2000) * 80);

    return 50;
  }

  private containsActionVerb(text: string): boolean {
    const actionVerbs = [
      'developed', 'implemented', 'managed', 'created', 'designed', 'built',
      'optimized', 'improved', 'increased', 'decreased', 'led', 'coordinated'
    ];
    return actionVerbs.some(verb => text.toLowerCase().includes(verb));
  }

  private containsTechnicalTerm(text: string): boolean {
    const technicalTerms = [
      'api', 'database', 'framework', 'library', 'algorithm', 'automation',
      'integration', 'deployment', 'architecture', 'performance', 'security'
    ];
    return technicalTerms.some(term => text.toLowerCase().includes(term));
  }
}