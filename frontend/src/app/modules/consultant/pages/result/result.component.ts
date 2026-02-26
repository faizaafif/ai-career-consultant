import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { ConsultantStateService, ConsultantData } from '../../services/consultant-state.service';
import { ConsultantApiService, ChatMessage, ChatRequest } from '../../services/consultant-api.service';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  resultData: any = null;
  profileData: ConsultantData | null = null;
  loading = true;

  chatMessages: ChatMessage[] = [];
  userMessage = '';
  sending = false;
  chatError: string | null = null;

  constructor(
    private state: ConsultantStateService,
    private api: ConsultantApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const result = this.state.getResult();

    if (result) {
      this.resultData = result;
      this.loading = false;
    }

    this.profileData = this.state.getConsultantData();

    this.chatMessages.push({
      role: 'assistant',
      content: 'You can ask me any follow-up questions about these career recommendations or your situation.'
    });
  }

  askQuestion(): void {
    if (!this.userMessage.trim() || this.sending || this.loading) {
      return;
    }

    this.chatError = null;

    const trimmed = this.userMessage.trim();
    this.chatMessages.push({
      role: 'user',
      content: trimmed
    });

    const payload: ChatRequest = {
      profile: this.profileData,
      analysisResult: this.resultData,
      messages: this.chatMessages
    };

    this.sending = true;

    this.api.chat(payload).subscribe({
      next: (response) => {
        const reply = response?.data?.reply || 'Sorry, I could not generate a response right now.';

        this.chatMessages.push({
          role: 'assistant',
          content: reply
        });

        this.userMessage = '';
        this.sending = false;
      },
      error: (error) => {
        console.error('Chat error:', error);
        this.chatError = 'Something went wrong while contacting the consultant. Please try again.';
        this.sending = false;
      }
    });
  }

  restart(): void {
    this.state.reset();
    this.router.navigate(['/consultant']);
  }
}
