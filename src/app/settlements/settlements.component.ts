import { Component, OnInit } from '@angular/core';
import { BaseService } from '../base.service';
import { AuthService } from '../auth.service';
import { CommentService } from '../comment.service';

@Component({
  selector: 'app-settlements',
  templateUrl: './settlements.component.html',
  styleUrls: ['./settlements.component.css'],
  standalone: false
})
export class SettlementsComponent implements OnInit {
  datas: any[] = [];
  settlements = { 
    id: null, 
    Helysegnev: '', 
    KH: null, 
    keleti_hossz_fok_perc: null, 
    ESZ: null, 
    eszaki_szelesseg_fok_perc: null 
  };
  user: any;
  comments: any[] = [];
  commentData = { id: null, Helysegnev: '', Comment: '', Email: '' };

  constructor(
    private base: BaseService, 
    private auth: AuthService, 
    private commentService: CommentService
  ) {}

  ngOnInit(): void {
    this.getDatas();
    this.auth.getCurrentUser().subscribe(user => {
      if (user) {
        this.user = user;
        this.commentData.Email = user.email || '';
      }
    });
  }

  getDatas(): void {
    this.base.getDatas().subscribe(res => {
      if (res) {
        this.datas = res.map(data => ({
          id: data.id ?? null,
          Helysegnev: data.Helysegnev ?? '',
          KH: data.KH ?? null,
          keleti_hossz_fok_perc: data.keleti_hossz_fok_perc ?? null,
          ESZ: data.ESZ ?? null,
          eszaki_szelesseg_fok_perc: data.eszaki_szelesseg_fok_perc ?? null
        }));
      }
    });
  }

  addSettlement(): void {
    this.base.createSettlement(this.settlements).subscribe(() => {
      this.getDatas();
      this.settlements = { id: null, Helysegnev: '', KH: null, keleti_hossz_fok_perc: null, ESZ: null, eszaki_szelesseg_fok_perc: null };
    });
  }

  updateSettlement(settlement: any): void {
    if (!settlement.id) return;
    this.base.updateSettlement(settlement.id, settlement).subscribe(() => this.getDatas());
  }

  deleteSettlement(id: string): void {
    this.base.deleteSettlement(id).subscribe(() => this.getDatas());
  }

  loadComments(helysegnev: string): void {
    this.commentService.getComments().subscribe(res => {
      this.comments = res ? Object.values(res).filter(c => c.Helysegnev === helysegnev) : [];
      this.commentData.Helysegnev = helysegnev;
    });
  }

  postComment(): void {
    if (this.commentData.Comment.trim()) {
      this.commentService.createComment(this.commentData).subscribe(() => {
        this.comments.push({ ...this.commentData });
        this.commentData.Comment = '';
      });
    } else {
      console.warn('A hozzászólás mező nem lehet üres!');
    }
  }
}
