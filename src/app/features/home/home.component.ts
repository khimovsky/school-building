import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {GalleryComponent} from "../../shared/widgets/gallery/gallery.component";
import {ButtonPrimaryComponent} from "../../shared/components/blocks/buttons/primary/button-primary.component";
import {IconComponent} from "../../shared/components/elements/icon/icon.component";
import {AsyncPipe, CurrencyPipe} from "@angular/common";
import {VideoPlayerComponent} from "../../shared/components/blocks/video-player/video-player.component";
import {PayComponent} from "../../shared/components/blocks/pay/pay.component";
import {ShareService} from "../../shared/services/share.service";
import {ReportService} from "../../shared/services/report/report.service";
import {ReportDTO} from "../../shared/services/report/report.model";
import {BehaviorSubject, tap} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {LoadingComponent, LoadingStatus} from "../../shared/components/blocks/loading/loading.component";
import {ErrorComponent} from "../../shared/components/blocks/error/error.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [GalleryComponent, ButtonPrimaryComponent, IconComponent, CurrencyPipe, VideoPlayerComponent, PayComponent, AsyncPipe, LoadingComponent, ErrorComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly shareService = inject(ShareService);
  private readonly reportService = inject(ReportService);

  private readonly reportSubject = new BehaviorSubject<ReportDTO | null>(null);
  protected readonly report$ = this.reportSubject.asObservable();

  protected loadingStatus: LoadingStatus = LoadingStatus.loading;

  protected readonly imagesPlan: string[] = Array.from(
    { length: 12 },
    (_, i: number): string => `/assets/images/plan/building-${i + 1}.jpg`
  );

  protected readonly imagesStage: string[] = Array.from(
    { length: 15 },
    (_, i: number): string => `/assets/images/stage/building-${i + 1}.jpg`
  );

  ngOnInit(): void {
   this.toReport();
  }

  protected toShare(): void {
    this.shareService.shareSite();
  }

  protected toReport(): void {
    this.reportService.report()
      .pipe(
        tap((): void => {
          this.loadingStatus = LoadingStatus.loading
        }),
        takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (report: ReportDTO): void => {
          this.reportSubject.next(report);
          this.loadingStatus = LoadingStatus.loaded;
        },
        error: (): void => {
          this.loadingStatus = LoadingStatus.error;
        }
      })
  }
}
