import awsQuestions from './aws.json';
import azureQuestions from './azure.json';
import gcpQuestions from './gcp.json';
import comptiaQuestions from './comptia.json';
import ciscoQuestions from './cisco.json';
import securityQuestions from './security.json';
import devopsQuestions from './devops.json';
import projectmgmtQuestions from './projectmgmt.json';
import dataaiQuestions from './dataai.json';
import type { Question } from '../../types';

const ALL_QUESTIONS: Question[] = [
  ...(awsQuestions as Question[]),
  ...(azureQuestions as Question[]),
  ...(gcpQuestions as Question[]),
  ...(comptiaQuestions as Question[]),
  ...(ciscoQuestions as Question[]),
  ...(securityQuestions as Question[]),
  ...(devopsQuestions as Question[]),
  ...(projectmgmtQuestions as Question[]),
  ...(dataaiQuestions as Question[]),
];

const DOMAIN_MAP: Record<string, Question[]> = {
  'Cloud — AWS': awsQuestions as Question[],
  'Cloud — Azure': azureQuestions as Question[],
  'Cloud — GCP': gcpQuestions as Question[],
  'General IT — CompTIA': comptiaQuestions as Question[],
  'Networking — Cisco': ciscoQuestions as Question[],
  'Cybersecurity': securityQuestions as Question[],
  'DevOps, Kubernetes & Linux': devopsQuestions as Question[],
  'Project Management & ITSM': projectmgmtQuestions as Question[],
  'Data, AI & Analytics': dataaiQuestions as Question[],
};

export function getQuestionsForCert(certId: string, domain: string): Question[] {
  const domainQuestions = DOMAIN_MAP[domain] ?? ALL_QUESTIONS;
  const filtered = domainQuestions.filter((q) => q.certId === certId);
  if (filtered.length > 0) return filtered;
  return domainQuestions.slice(0, Math.min(15, domainQuestions.length));
}

export function getAllQuestions(): Question[] {
  return ALL_QUESTIONS;
}

export { DOMAIN_MAP };
