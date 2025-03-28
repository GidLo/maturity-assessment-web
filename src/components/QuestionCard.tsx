
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QuestionType, AnswerType } from '@/types/assessment';
import RatingSelector from './RatingSelector';
import { Info, ChevronDown, ChevronUp, Eye } from 'lucide-react';

interface QuestionCardProps {
  question: QuestionType;
  answer?: AnswerType;
  onAnswer: (answer: AnswerType) => void;
  isActive: boolean;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  answer,
  onAnswer,
  isActive
}) => {
  const [showDescription, setShowDescription] = useState(false);
  const [showLevelDescriptions, setShowLevelDescriptions] = useState(false);
  
  // Get level descriptions based on the competency
  const getLevelDescriptions = (competency: string) => {
    // Default descriptions if competency-specific ones aren't found
    const defaultDescriptions = [
      "No evidence of efforts to assess new procedures, tools and techniques.",
      "Supply Chain sporadically assesses new procedures, tools and techniques but there is limited forward planning.",
      "Supply Chain monitoring of developments in procedures, tools and techniques for potential application is informal.",
      "Supply Chain actively monitors developments in procedures, tools and techniques for potential application.",
      "Supply Chain leaders follow and implement innovations and trends in Procurement and Supply Chain."
    ];
    
    // Competency-specific level descriptions 
    const competencyDescriptions: Record<string, string[]> = {
      "Supply Chain Vision and Strategy": [
        "No documented Supply Chain strategy or monitoring of performance against improvement goals.",
        "Supply Chain strategy is poorly understood even within Supply Chain and is not a factor in decision-making.",
        "Supply Chain staff are aware of Supply Chain strategy but there is little evidence that it is a factor in day-to-day decision-making.",
        "Strategy is frequently referenced by Supply with a balanced set of KPIs that is used to track progress against strategic goals.",
        "There is clear evidence that strategy is being used to guide decision-making in Supply and in procurement activity across the business."
      ],
      "Category Management": [
        "Not utilised at any level, with fragmented/silo purchasing across departments.",
        "At a business/operating unit level only, with no evidence of attempts to bundle services with existing suppliers.",
        "Across the key Supply Chain entities for some major categories of spend.",
        "Across the key Supply Chain entities for most major categories of spend.",
        "Across all Supply Chain entities for all significant and appropriate areas of spend."
      ],
      "Strategic Sourcing": [
        "Not formalised, price is the key evaluation measure for decisions.",
        "Defined but not consistently applied, decisions are typically price-based and driven by business users.",
        "Defined and embedded in Supply Chain procedures, selection tends to be based on price and quality.",
        "Defined and embedded in Supply Chain procedures, selection tends to be based on an evaluation of full acquisition and ownership costs.",
        "Defined and embedded in Supply Chain procedures, Total Cost of Ownership (TCO) is consistently used as the basis for Supplier selection."
      ],
      "Contract & Compliance Management": [
        "Contracts often not in place even with key suppliers.",
        "Contracts in place for most major purchases but contract models and content are not standardised.",
        "Contracts in place for most major purchases and standard contract models defined, but use of standard model and content varies across the business.",
        "Long term, contracts are in place for all strategic purchases and in many cases these include stringent service levels with limited flexibility for complex categories.",
        "Long term, contracts are in place for all strategic purchases and in many cases these include stringent service levels with a flexible approach to complex categories."
      ],
      "Transaction Management": [
        "No workflow is used in the P2P process, with inconsistent approval processes and use of PO's are rare.",
        "Limited workflow is used in the process, with the approval process not standardised across the organisation.",
        "P2P workflow does not cover procurement intervention, with evidence of inconsistent approval process application.",
        "P2P is standard across the board with delegated authorities integrated in the core P2P systems.",
        "P2P process is consistent and flexible across categories, with the delegated authorities clearly defined."
      ],
      "Supplier Management": [
        "Supply base is growing aggressively year on year with new suppliers added constantly, with no supplier rationalisation efforts.",
        "Supply base is growing strongly year on year, with acknowledged need to consolidate suppliers.",
        "Some evidence of efforts to reduce supplier numbers in last 3 years but no current activity in progress.",
        "Supplier rationalisation initiatives have made some progress in reducing numbers of active suppliers but there is more work to do.",
        "Supplier rationalisation initiatives have succeeded in reducing numbers of active suppliers to a point where there is an optimal number of suppliers."
      ],
      "Warehousing Operations": [
        "No rules on sales order quantities, with no discipline in order cut-off times.",
        "Few sales order quantity rules, but not always efficiency geared and modest order cut-off time discipline.",
        "Majority of sales order quantity rules established, with inconsistency of order cut-off time discipline.",
        "Sales order quantities established and observed, order cut-off times well observed.",
        "Sales order quantity rules drive logistics efficiencies with order cut-off rules well known and rigorously observed."
      ],
      "Supply Management": [
        "Not formally developed. Procurement activity is short-term and focused on simple replenishment.",
        "Developed but unreliable due to weaknesses in sales & operations plans and/or maintenance plans.",
        "Well-developed, based on sales & operations plans and maintenance plans. It is not consistently driven across categories or business units.",
        "Derived from sales & operations plans and maintenance plans. It is enabled by technology across all categories and business units.",
        "Excellent, derived from sales & operations plans and maintenance plans. It is regularly communicated electronically to all major suppliers."
      ],
      "Risk Management": [
        "Across the organisation there are multiple parties actively engaging and contracting with suppliers and placing orders outside delegation of authority.",
        "Policy is in place governing financial authorities for placing orders and approving invoices but no clear policy on contracting with suppliers.",
        "There are clear policies and delegations of authority in place governing all Procurement activity but compliance with these is mixed across the organisation.",
        "There are clear policies and delegations of authority in place governing all Procurement activity with compliance typically good.",
        "There are clear policies and well understood delegations of authority in place governing all activity, with high levels of compliance."
      ],
      "Organisation": [
        "Supply Chain not recognised as a function/ no central Supply Chain team.",
        "Supply Chain teams and resources are decentralised and fragmented across divisions/business Units.",
        "Central Supply Chain function in place but with limited direct influence over the Supply Chain teams located in and reporting to business units/divisions.",
        "Centralised or centre-led Supply Chain organisation structure in place for key cross-organisation categories but pockets of de-centralised procurement activity still exist.",
        "Centralised or centre-led Supply Chain organisation structure in place. Co-located/de-centralised buyers support specific business needs."
      ],
      "People": [
        "Staff generally low skilled. Even levels of technical competence are very variable.",
        "Category managers/Supply Chain managers have strong technical competencies but in general soft skills are weak.",
        "Typically category managers/Supply Chain managers have strong technical competencies but levels of softer skills vary significantly within the function.",
        "Most category managers/Supply Chain managers have both the deep technical and strong interpersonal skills required.",
        "All category managers/Supply Chain managers have both the deep technical and strong interpersonal skills required."
      ],
      "Technology, Data & Information": [
        "Disparate and/or ineffective systems supported by manual spreadsheets.",
        "Disparate and/or ineffective systems with some automation utilised.",
        "The enterprise is beginning to integrate systems.",
        "Single or fully integrated systems not being completely utilised.",
        "Single or fully integrated systems effectively utilised across the organisation."
      ],
      "Performance Metrics": [
        "Use of KPIs is limited to reporting on cost savings.",
        "KPIs cover high value / strategic procurement only. Inconsistent application across different organisation unit.",
        "KPIs cover all procurement activity, (cost, quality, schedule) but inconsistent application across different organisation units makes reporting at corporate level problematic.",
        "KPIs cover all procurement activity, (cost, quality, schedule). Consistent reporting is possible across all organisation units.",
        "KPIs cover all procurement activity, (cost, quality, schedule). Consistent reporting is automated across all organisation units."
      ],
      "Environmental Social and Governance (ESG)": [
        "No tracking currently exists.",
        "Minimum tracking on regulatory requirements with significant room for improvement.",
        "Adequate tracking at business unit level with specific focus on regulatory requirements.",
        "Adequate tracking on critical regulatory requirements across the organisation with minimal coverage of ESG priorities.",
        "Adequate tracking of regulatory requirements and ESG priorities across the organisation."
      ],
      "Enterprise & Supplier Development": [
        "No tracking exists at business unit level.",
        "Manual tracking exists outside of the Supply Chain systems.",
        "Manual tracking exists with coverage up to group level.",
        "Semi-automated ESD tracking dashboards with minimal manual interventions still required.",
        "Fully automated ESD tracking dashboards integrated to the Supply Chain systems."
      ]
    };
    
    // Return the competency-specific descriptions if available, otherwise return default
    return competencyDescriptions[competency] || defaultDescriptions;
  };
  
  const levelDescriptions = getLevelDescriptions(question.competency);
  
  const handleRatingChange = (rating: number) => {
    onAnswer({
      questionId: question.id,
      rating,
    });
  };

  const variants = {
    enter: { opacity: 0, x: 40 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -40 }
  };

  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div
          key={question.id}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="w-full glass-card rounded-xl p-6 md:p-8"
        >
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-start justify-between">
                <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                  {question.competency}
                </div>
                
                {question.description && (
                  <button
                    onClick={() => setShowDescription(!showDescription)}
                    className="group p-1 rounded-full hover:bg-secondary"
                    aria-label="Show description"
                  >
                    <Info className="size-4 text-muted-foreground group-hover:text-foreground" />
                  </button>
                )}
              </div>
              
              <h3 className="text-xl font-medium text-foreground">{question.text}</h3>
              
              <AnimatePresence>
                {showDescription && question.description && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-sm text-muted-foreground"
                  >
                    {question.description}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
            
            <div className="pt-2">
              <RatingSelector
                value={answer?.rating || 0}
                onChange={handleRatingChange}
              />
              
              <div className="mt-4">
                <button
                  onClick={() => setShowLevelDescriptions(!showLevelDescriptions)}
                  className="flex items-center justify-center w-full gap-2 text-sm px-4 py-2 rounded-md bg-secondary/50 hover:bg-secondary transition-colors"
                >
                  <Eye className="size-4" />
                  <span>
                    {showLevelDescriptions 
                      ? "Hide level descriptions" 
                      : "Show description of levels"
                    }
                  </span>
                  {showLevelDescriptions 
                    ? <ChevronUp className="size-4" /> 
                    : <ChevronDown className="size-4" />
                  }
                </button>
                
                <AnimatePresence>
                  {showLevelDescriptions && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-3 space-y-2 text-sm bg-secondary/20 rounded-md p-3"
                    >
                      {levelDescriptions.map((desc, index) => (
                        <div key={index} className="flex gap-2">
                          <span className="flex-shrink-0 font-semibold">{index + 1}.</span>
                          <p className="text-muted-foreground">{desc}</p>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default QuestionCard;
