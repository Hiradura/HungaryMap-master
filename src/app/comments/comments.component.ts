import { Component, OnInit } from '@angular/core';
import { CommentService } from '../comment.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
  standalone: false
})
export class CommentsComponent implements OnInit {
  comments: any[] = [];
  commentData = { id: null, Helysegnev: '', Comment: '', Email: '' };
  user: any;

  constructor(
    private commentService: CommentService,
    private route: ActivatedRoute,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.loadComments();
    this.route.paramMap.subscribe(params => {
      this.commentData.Helysegnev = params.get('helysegnev') || '';
    });
    this.route.queryParams.subscribe(params => {
      this.commentData.Email = params['email'] || '';
    });
    this.auth.getCurrentUser().subscribe(user => {
      this.user = user;
    });
  }

  loadComments(): void {
    this.commentService.getComments().subscribe(res => {
      this.comments = res ? Object.values(res) : [];
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